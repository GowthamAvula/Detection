import { Container, Title, Text, SimpleGrid, Paper, Stack, Group, ThemeIcon, Divider, Box } from '@mantine/core'
import { IconShieldCheck, IconSearch, IconUsers, IconBook, IconTrophy, IconRobot, IconLock, IconGlobe } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import './About.css'

export default function About() {
    const stats = [
        { label: 'AI Accuracy', value: '98.5%', icon: IconRobot, color: 'cyan' },
        { label: 'Global Community', value: '10K+', icon: IconUsers, color: 'blue' },
        { label: 'Scams Prevented', value: '250K+', icon: IconShieldCheck, color: 'teal' },
    ]

    return (
        <div className="about-page">
            <Container size="lg" py={80}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <header className="about-header">
                        <Text className="mono-label" c="cyan" mb="xs">[ PROJECT_INTEL ]</Text>
                        <Title order={1} className="about-title">
                            About <span className="text-glow">PhishGuard</span>
                        </Title>
                        <Text className="about-subtitle" size="lg" mt="xl" opacity={0.7} maw={800}>
                            PhishGuard is an advanced cybersecurity platform designed to empower individuals with
                            AI-driven tools to detect, analyze, and report sophisticated phishing attempts.
                        </Text>
                    </header>
                </motion.div>

                <SimpleGrid cols={{ base: 1, sm: 3 }} gap="xl" mt={60}>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Paper className="stat-card" p="xl">
                                <Group align="center" gap="md">
                                    <ThemeIcon size={48} radius="md" variant="light" color={stat.color}>
                                        <stat.icon size={26} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="32px" fw={900} c="white" style={{ fontFamily: 'JetBrains Mono' }}>{stat.value}</Text>
                                        <Text size="xs" className="mono-label" opacity={0.5}>{stat.label}</Text>
                                    </div>
                                </Group>
                            </Paper>
                        </motion.div>
                    ))}
                </SimpleGrid>

                <Box mt={100} className="mission-section">
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80}>
                        <Stack gap="xl">
                            <div>
                                <Title order={2} c="white" mb="md">Our Mission</Title>
                                <Text c="dimmed" style={{ lineHeight: 1.8 }}>
                                    In an era where social engineering is becoming increasingly complex through AI,
                                    our mission is to provide a "Zero-Trust" shield for every internet user.
                                    We believe that security should not be a luxury, but a fundamental right.
                                </Text>
                            </div>

                            <div className="values-list">
                                <Group align="flex-start" mb="lg">
                                    <ThemeIcon variant="transparent" c="cyan"><IconLock size={20} /></ThemeIcon>
                                    <Box flex={1}>
                                        <Text fw={700} c="white">Privacy First</Text>
                                        <Text size="sm" c="dimmed">We analyze threats without compromising your personal data identity.</Text>
                                    </Box>
                                </Group>
                                <Group align="flex-start" mb="lg">
                                    <ThemeIcon variant="transparent" c="blue"><IconGlobe size={20} /></ThemeIcon>
                                    <Box flex={1}>
                                        <Text fw={700} c="white">Community Driven</Text>
                                        <Text size="sm" c="dimmed">Knowledge sharing is our greatest weapon against digital deception.</Text>
                                    </Box>
                                </Group>
                            </div>
                        </Stack>

                        <Paper className="tech-stack-card" p={40}>
                            <Title order={3} c="white" mb="xl" style={{ letterSpacing: '1px' }}>SYSTEM_ARCHITECTURE</Title>
                            <Divider opacity={0.1} mb="xl" />
                            <Stack gap="lg">
                                <Box>
                                    <Text size="xs" className="mono-label" c="cyan">NEURAL_ENGINE</Text>
                                    <Text size="sm" c="dimmed">Leveraging Llama-3 & Groq for real-time semantic analysis.</Text>
                                </Box>
                                <Box>
                                    <Text size="xs" className="mono-label" c="cyan">THREAT_INTELLIGENCE</Text>
                                    <Text size="sm" c="dimmed">Global database of reported phishing vectors and malicious URLs.</Text>
                                </Box>
                                <Box>
                                    <Text size="xs" className="mono-label" c="cyan">SECURE_SYNC</Text>
                                    <Text size="sm" c="dimmed">Encrypted storage for user reports and scan history via Supabase.</Text>
                                </Box>
                            </Stack>
                        </Paper>
                    </SimpleGrid>
                </Box>
            </Container>
        </div>
    )
}
