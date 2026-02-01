import { Container, Title, Text, Paper, Stack, Group, Button, TextInput, Divider, Badge, Avatar, SimpleGrid, Tabs, ActionIcon } from '@mantine/core'
import { IconUser, IconMail, IconLock, IconLogout, IconShieldCheck, IconAlertCircle, IconBell, IconFingerprint, IconSettings, IconShieldLock } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { motion } from 'framer-motion'
import './Profile.css'

export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [isDemo, setIsDemo] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
            } else if (sessionStorage.getItem('demoMode') === 'true') {
                setIsDemo(true)
                setUser({
                    email: 'demo@sentinel.security',
                    created_at: new Date().toISOString(),
                    user_metadata: { full_name: 'Demo Sentinel User' }
                })
            }
        }
        getUser()
    }, [])

    const handleSignOut = async () => {
        if (isDemo) {
            sessionStorage.removeItem('demoMode')
        }
        await supabase.auth.signOut()
        navigate('/login')
    }

    const handleChangePassword = async () => {
        if (!newPassword) return
        setLoading(true)
        const { error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) {
            notifications.show({
                title: 'Security Alert',
                message: error.message,
                color: 'red',
                icon: <IconAlertCircle size={18} />
            })
        } else {
            notifications.show({
                title: 'Operation Successful',
                message: 'Your credentials have been updated.',
                color: 'green',
                icon: <IconShieldCheck size={18} />
            })
            setNewPassword('')
        }
        setLoading(false)
    }

    if (!user) return null

    return (
        <motion.div
            className="profile-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container size="lg" py={50}>
                <Group justify="space-between" mb={40}>
                    <div>
                        <Text className="mono-label" mb={5}>[ ACCOUNT_SETTINGS ]</Text>
                        <Title order={1} style={{ fontSize: '3rem', letterSpacing: '-1.5px' }}>User Profile</Title>
                        <Text c="dimmed">Manage your account details and security settings</Text>
                    </div>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                    {/* Sidebar Profile Card */}
                    <Paper className="profile-sidebar-card shadow-glow" p={30}>
                        <Stack align="center" gap="lg">
                            <div className="avatar-wrapper">
                                <Avatar size={120} radius={120} color="cyan" style={{ border: '2px solid rgba(0,242,255,0.3)' }}>
                                    {user.user_metadata?.full_name?.[0] || 'U'}
                                </Avatar>
                                <div className="status-pulse"></div>
                            </div>

                            <Stack align="center" gap={5}>
                                <Title order={3} c="white" style={{ letterSpacing: '1px' }}>{user.user_metadata?.full_name?.toUpperCase() || 'CYBER GUARDIAN'}</Title>
                                <Badge variant="filled" color="cyan" size="sm" style={{ textTransform: 'none', fontFamily: 'JetBrains Mono', borderRadius: '4px' }}>
                                    {user.email}
                                </Badge>
                            </Stack>

                            <Divider w="100%" opacity={0.05} />

                            <Group w="100%" justify="space-between">
                                <Text className="mono-label" size="9px">ACCOUNT_STATUS</Text>
                                <Badge color="cyan" variant="outline" style={{ borderRadius: '4px' }}>VERIFIED_USER</Badge>
                            </Group>

                            <Group w="100%" justify="space-between">
                                <Text className="mono-label" size="9px">JOINED_ON</Text>
                                <Text size="xs" c="white" fw={700} style={{ fontFamily: 'JetBrains Mono' }}>{new Date(user.created_at).toLocaleDateString().replace(/\//g, '.')}</Text>
                            </Group>

                            <Button
                                className="terminate-btn"
                                fullWidth
                                mt="xl"
                                leftSection={<IconLogout size={18} />}
                                onClick={handleSignOut}
                                variant="filled"
                            >
                                LOGOUT
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Main Settings Card */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <Paper className="profile-tabs-wrapper" p={0}>
                            <Tabs defaultValue="info" variant="pills" className="profile-tabs">
                                <Tabs.List p="md">
                                    <Tabs.Tab value="info" leftSection={<IconUser size={14} />}>INFO</Tabs.Tab>
                                    <Tabs.Tab value="security" leftSection={<IconShieldLock size={14} />}>SECURITY</Tabs.Tab>
                                    <Tabs.Tab value="activity" leftSection={<IconFingerprint size={14} />}>ACTIVITY</Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="info" p={30}>
                                    <Stack gap="xl">
                                        <div>
                                            <Text className="mono-label" size="9px" mb={10} color="cyan">[ YOUR_INFO ]</Text>
                                            <Title order={4} mb="sm" c="white" style={{ letterSpacing: '1px' }}>Profile Information</Title>
                                            <Text size="xs" c="dimmed" mb="xl">View and manage your account details.</Text>

                                            <SimpleGrid cols={1} spacing="lg">
                                                <TextInput
                                                    label="Display Name"
                                                    value={user.user_metadata?.full_name || 'Cyber Guardian'}
                                                    readOnly
                                                    className="profile-field"
                                                    leftSection={<IconUser size={16} color="#00f2ff" />}
                                                />
                                                <TextInput
                                                    label="Email Address"
                                                    value={user.email}
                                                    readOnly
                                                    className="profile-field"
                                                    leftSection={<IconMail size={16} color="#00f2ff" />}
                                                />
                                            </SimpleGrid>
                                        </div>
                                    </Stack>
                                </Tabs.Panel>

                                <Tabs.Panel value="security" p={30}>
                                    <Stack gap="xl">
                                        <div>
                                            <Text className="mono-label" size="9px" mb={10} color="cyan">[ SECURITY_SETTINGS ]</Text>
                                            <Title order={4} mb="sm" c="white" style={{ letterSpacing: '1px' }}>Password Management</Title>
                                            <Text size="xs" c="dimmed" mb="xl">Update your password to keep your account secure.</Text>

                                            <TextInput
                                                label="New Password"
                                                placeholder="Enter new password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="profile-field"
                                                leftSection={<IconLock size={16} color="#00f2ff" />}
                                            />

                                            <Button
                                                mt="xl"
                                                size="md"
                                                className="authorize-btn"
                                                loading={loading}
                                                disabled={!newPassword || newPassword.length < 6}
                                                onClick={handleChangePassword}
                                                radius="md"
                                            >
                                                UPDATE_PASSWORD
                                            </Button>
                                        </div>

                                        <Divider opacity={0.05} />

                                        <div>
                                            <Title order={4} mb="md" c="white" style={{ fontSize: '14px', letterSpacing: '1px' }}>SECURITY_FEATURES</Title>
                                            <Group justify="space-between" className="security-item" p="md">
                                                <Stack gap={0}>
                                                    <Text fw={800} size="sm" c="white" style={{ letterSpacing: '0.5px' }}>THREAT_DETECTION</Text>
                                                    <Text size="10px" c="dimmed" style={{ fontFamily: 'JetBrains Mono' }}>REAL_TIME_PROTECTION</Text>
                                                </Stack>
                                                <Badge color="cyan" variant="filled" size="sm">ACTIVE</Badge>
                                            </Group>
                                        </div>
                                    </Stack>
                                </Tabs.Panel>

                                <Tabs.Panel value="activity" p={30}>
                                    <Stack align="center" py={50} gap="md">
                                        <IconFingerprint size={60} color="#00f2ff" style={{ opacity: 0.2 }} />
                                        <Text className="mono-label" size="xs">NO_RECENT_ALERTS</Text>
                                        <Text size="xs" c="dimmed">Your activity history will appear here.</Text>
                                    </Stack>
                                </Tabs.Panel>
                            </Tabs>
                        </Paper>
                    </div>
                </SimpleGrid>
            </Container>
        </motion.div>
    )
}
