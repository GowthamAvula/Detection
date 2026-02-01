import { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { Loader, Stack, Text } from '@mantine/core'

export default function AuthGuard({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        checkUser()

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    if (loading) {
        return (
            <Stack align="center" justify="center" h="80vh">
                <Loader color="cyan" size="xl" type="bars" />
                <Text className="mono-label" color="cyan">CHECKING_ACCESS...</Text>
            </Stack>
        )
    }

    if (!user) {
        const isDemo = sessionStorage.getItem('demoMode') === 'true'
        if (isDemo) return children
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
