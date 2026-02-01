import { SimpleGrid, Paper, Title, Text, Group, Stack, Badge, RingProgress, Avatar, ActionIcon, Loader, Divider } from '@mantine/core'
import { IconSearch, IconShieldCheck, IconAlertTriangle, IconVirus, IconDots, IconArrowUpRight, IconCalendar, IconChartBar, IconBook, IconClock } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Dashboard.css'

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, phishing: 0, safe: 0 })
    const [recentScans, setRecentScans] = useState([])
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('Cyber Guardian')

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)

            // Get user info
            const { data: { user } } = await supabase.auth.getUser()
            if (user?.user_metadata?.full_name) {
                setUserName(user.user_metadata.full_name)
            } else if (sessionStorage.getItem('demoMode') === 'true') {
                setUserName('Demo Sentinel User')
            }

            // Get detection counts
            const { data: detections, error } = await supabase
                .from('detections')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error && detections) {
                const phishingCount = detections.filter(d => d.is_phishing).length
                const safeCount = detections.length - phishingCount

                setStats({
                    total: detections.length,
                    phishing: phishingCount,
                    safe: safeCount
                })

                setRecentScans(detections.slice(0, 5))
            }
            setLoading(false)
        }

        fetchDashboardData()
    }, [])

    const safetyScore = stats.total > 0
        ? Math.round((stats.safe / stats.total) * 100)
        : 100

    if (loading) {
        return (
            <Stack align="center" justify="center" h="80vh">
                <Loader color="purple" size="xl" type="bars" />
                <Text c="dimmed">Updating Dashboard...</Text>
            </Stack>
        )
    }

    return (
        <motion.div
            className="dashboard-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="dashboard-header">
                <div>
                    <Text className="mono-label" mb={5}>[ DASHBOARD_STATUS ]</Text>
                    <Title order={1} className="page-title">Security Dashboard</Title>
                    <Text c="dimmed">User: {userName} // ACTIVE</Text>
                </div>
                <Group>
                    <Avatar size="lg" radius="md" color="cyan" variant="light" style={{ border: '1px solid rgba(0, 242, 255, 0.2)' }}>
                        {userName[0]}
                    </Avatar>
                </Group>
            </div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="xl">
                {/* Left Column - Real-time Stats */}
                <Stack>
                    <Paper className="action-card card-green" component={motion.div} whileHover={{ translateY: -5 }}>
                        <Group justify="space-between" align="flex-start">
                            <div>
                                <Text className="mono-label" size="xs" c="cyan">TOTAL_SCANS</Text>
                                <Title order={4} mt={5}>Total Scans</Title>
                                <Text size="32px" fw={900} mt="xs" c="white" style={{ fontFamily: 'JetBrains Mono' }}>
                                    {stats.total.toString().padStart(3, '0')}
                                </Text>
                            </div>
                            <ActionIcon variant="transparent" c="cyan"><IconChartBar /></ActionIcon>
                        </Group>
                        <Group mt="md" align="center" gap="xs">
                            <IconClock size={16} color="#00f2ff" />
                            <Text size="xs" c="cyan" fw={700}>PROTECTION_ON</Text>
                        </Group>
                    </Paper>

                    <Paper className="action-card card-red" component={motion.div} whileHover={{ translateY: -5 }}>
                        <Group justify="space-between" align="flex-start">
                            <div>
                                <Text className="mono-label" size="xs" c="red">BLOCKED</Text>
                                <Title order={4} mt={5}>Blocked</Title>
                                <Text size="32px" fw={900} mt="xs" c="white" style={{ fontFamily: 'JetBrains Mono' }}>
                                    {stats.phishing.toString().padStart(3, '0')}
                                </Text>
                            </div>
                            <ActionIcon variant="transparent" c="red"><IconAlertTriangle /></ActionIcon>
                        </Group>
                        <Group mt="md" align="center" gap="xs">
                            <IconVirus size={16} color="red" />
                            <Text size="xs" c="red" fw={700}>THREATS_FOUND</Text>
                        </Group>
                    </Paper>

                    <Paper className="action-card card-purple" component={motion.div} whileHover={{ translateY: -5 }}>
                        <Group justify="space-between" align="flex-start">
                            <div>
                                <Text className="mono-label" size="xs" c="purple">SAFE_RESULTS</Text>
                                <Title order={4} mt={5}>Safe Content</Title>
                                <Text size="32px" fw={900} mt="xs" c="white" style={{ fontFamily: 'JetBrains Mono' }}>
                                    {stats.safe.toString().padStart(3, '0')}
                                </Text>
                            </div>
                            <ActionIcon variant="transparent" c="purple"><IconShieldCheck /></ActionIcon>
                        </Group>
                        <Group mt="md" align="center" gap="xs">
                            <Text size="xs" c="purple" fw={700}>SECURE</Text>
                        </Group>
                    </Paper>
                </Stack>

                {/* Middle - Visual Analytics */}
                <Stack>
                    <Paper className="glass-card full-height">
                        <div className="cyber-card-header" style={{ margin: '-2rem -2rem 1.5rem', borderRadius: '20px 20px 0 0' }}>
                            [ DISTRIBUTION ]
                        </div>

                        <div className="chart-area" style={{ height: '200px' }}>
                            <Group align="flex-end" gap="xl" justify="center" h="100%">
                                <Stack align="center" gap={10}>
                                    <motion.div
                                        className="chart-bar-v"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(stats.phishing / stats.total) * 100 || 5}%` }}
                                        style={{ backgroundColor: '#ff4d4d', width: '45px', borderRadius: '6px', boxShadow: '0 0 15px rgba(255, 77, 77, 0.3)' }}
                                    />
                                    <Text className="mono-label" size="9px">PHISHING</Text>
                                </Stack>
                                <Stack align="center" gap={10}>
                                    <motion.div
                                        className="chart-bar-v"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(stats.safe / stats.total) * 100 || 5}%` }}
                                        style={{ backgroundColor: '#00f2ff', width: '45px', borderRadius: '6px', boxShadow: '0 0 15px rgba(0, 242, 255, 0.3)' }}
                                    />
                                    <Text className="mono-label" size="9px">SAFE</Text>
                                </Stack>
                            </Group>
                        </div>

                        <Divider my="xl" opacity={0.05} />

                        <Stack align="center" gap={5}>
                            <Text className="mono-label" size="xs" opacity={0.5}>SYSTEM_STATUS</Text>
                            <Title order={2} c="white" style={{ letterSpacing: '2px' }}>SECURE</Title>
                        </Stack>
                    </Paper>

                    <Paper className="glass-card score-highlight">
                        <Stack align="center" gap={0}>
                            <RingProgress
                                size={150}
                                thickness={12}
                                roundCaps
                                sections={[{ value: safetyScore, color: '#00f2ff' }]}
                                className="safety-ring"
                                label={
                                    <Stack gap={0} align="center">
                                        <Text c="white" fw={900} ta="center" size="24px" style={{ fontFamily: 'JetBrains Mono' }}>{safetyScore}%</Text>
                                        <Text className="mono-label" size="8px">SAFE</Text>
                                    </Stack>
                                }
                            />
                            <Text className="mono-label" mt="md">SAFETY_SCORE</Text>
                        </Stack>
                    </Paper>
                </Stack>

                {/* Right - Live Threat Feed */}
                <Stack>
                    <Paper className="glass-card">
                        <div className="cyber-card-header" style={{ margin: '-2rem -2rem 1.5rem', borderRadius: '20px 20px 0 0' }}>
                            [ RECENT_ACTIVITY ]
                        </div>

                        <Stack gap="sm">
                            {recentScans.length === 0 ? (
                                <Text size="sm" c="dimmed" ta="center" py="xl">NO_RECORDS_FOUND</Text>
                            ) : (
                                recentScans.map((scan, i) => (
                                    <Group key={i} justify="space-between" className="recent-item">
                                        <Group gap="sm">
                                            <Avatar size="sm" radius="md" color={scan.is_phishing ? 'red' : 'cyan'} variant="light">
                                                {scan.is_phishing ? <IconAlertTriangle size={14} /> : <IconShieldCheck size={14} />}
                                            </Avatar>
                                            <div style={{ maxWidth: '120px' }}>
                                                <Text size="xs" fw={700} c="white" truncate>
                                                    {scan.content === '[IMAGE ANALYSIS]' ? 'IMG_SCAN' : scan.content}
                                                </Text>
                                                <Text size="8px" className="mono-label" opacity={0.5}>
                                                    {new Date(scan.created_at).toLocaleTimeString()}
                                                </Text>
                                            </div>
                                        </Group>
                                        <Badge color={scan.is_phishing ? 'red' : 'cyan'} variant="filled" size="sm" style={{ borderRadius: '4px', fontFamily: 'JetBrains Mono' }}>
                                            {scan.confidence}%
                                        </Badge>
                                    </Group>
                                ))
                            )}
                        </Stack>
                    </Paper>
                </Stack>
            </SimpleGrid>
        </motion.div>
    )
}
