import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Stack, Tooltip, UnstyledButton, rem, Menu, Avatar, Text, Group, Divider } from '@mantine/core'
import { supabase } from '../../lib/supabaseClient'
import {
    IconHome, IconSearch, IconChartBar, IconBook, IconSettings,
    IconLogout, IconShieldCheck, IconUser, IconUsers
} from '@tabler/icons-react'
import './Sidebar.css'

export default function Sidebar() {
    const location = useLocation()
    const [active, setActive] = useState(0)

    const mainLinks = [
        { icon: IconHome, label: 'Home', to: '/' },
        { icon: IconChartBar, label: 'Dashboard', to: '/dashboard' },
        { icon: IconSearch, label: 'Detection', to: '/detection' },
        { icon: IconUsers, label: 'Community', to: '/community' },
        { icon: IconBook, label: 'Learning', to: '/learning' },
        { icon: IconShieldCheck, label: 'Quiz', to: '/quiz' },
    ]

    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
            } else if (sessionStorage.getItem('demoMode') === 'true') {
                setUser({
                    email: 'demo@sentinel.security',
                    user_metadata: { full_name: 'Demo Sentinel User' }
                })
            }
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        sessionStorage.removeItem('demoMode')
        await supabase.auth.signOut()
        navigate('/login')
    }

    const links = mainLinks.map((link, index) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                component={Link}
                to={link.to}
                className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`}
            >
                <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ))

    return (
        <nav className="sidebar glass-panel">
            <div className="sidebar-logo">
                <IconShieldCheck size={32} color="#00f2ff" />
            </div>

            <div className="sidebar-content">
                <Stack justify="center" gap={15}>
                    {links}
                </Stack>
            </div>

            <div className="sidebar-footer">
                <Menu position="right-end" offset={10} withArrow shadow="md" width={240}>
                    <Menu.Target>
                        <UnstyledButton
                            className={`sidebar-link ${location.pathname === '/profile' ? 'active' : ''}`}
                        >
                            <IconUser style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown className="profile-menu-dropdown">
                        <div className="menu-header" style={{ padding: '15px' }}>
                            <Group>
                                <Avatar color="purple" radius="xl">
                                    {user?.user_metadata?.full_name?.[0] || 'U'}
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                    <Text size="sm" fw={700} c="white" truncate>
                                        {user?.user_metadata?.full_name || 'User'}
                                    </Text>
                                    <Text size="xs" c="dimmed" truncate>
                                        {user?.email}
                                    </Text>
                                </div>
                            </Group>
                        </div>

                        <Divider opacity={0.1} />

                        <Menu.Label>Account</Menu.Label>
                        <Menu.Item
                            leftSection={<IconUser size={14} />}
                            component={Link}
                            to="/profile"
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconChartBar size={14} />}
                            component={Link}
                            to="/dashboard"
                        >
                            Activity
                        </Menu.Item>

                        <Divider opacity={0.1} />

                        <Menu.Item
                            color="red"
                            leftSection={<IconLogout size={14} />}
                            onClick={handleLogout}
                        >
                            Sign Out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </nav>
    )
}
