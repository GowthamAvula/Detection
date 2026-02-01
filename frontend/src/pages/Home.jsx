import { Container, Title, Text, SimpleGrid, Paper, Badge, Group, Button, Stack, ThemeIcon, List, rem, Divider, Card, Image } from '@mantine/core'
import { IconShieldCheck, IconAlertTriangle, IconNews, IconArrowRight, IconLock, IconGlobe, IconGhost, IconUrgent, IconExternalLink, IconBook2, IconHandStop, IconFingerprint } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

export default function Home() {
    const news = [
        {
            title: "Sophisticated Post-Quantum Phishing Alerts",
            category: "Critical",
            date: "Feb 01, 2026",
            desc: "New threat actors are leveraging quantum-ready scripts to bypass traditional encryption layers.",
            url: "https://www.bleepingcomputer.com/",
            color: "red"
        },
        {
            title: "Apple ID 'Vision Pro' Vision Scam",
            category: "Trend",
            date: "Jan 31, 2026",
            desc: "Immersive phishing attempts targeting Vision Pro users via spatial computing overlays found in the wild.",
            url: "https://krebsonsecurity.com/",
            color: "blue"
        },
        {
            title: "AI Voice Cloning Fraud spikes 400%",
            category: "Tech",
            date: "Jan 28, 2026",
            desc: "Cybersecurity experts warn of 'perfect voice' clones used to authorize high-value wire transfers.",
            url: "https://www.theverge.com/cybersecurity",
            color: "purple"
        }
    ]

    const guidelines = [
        {
            icon: IconGlobe,
            title: "Check the URL",
            desc: "Verify domain spellings. Hackers use 'typo-squatting' (e.g., g00gle.com instead of google.com).",
            color: "blue"
        },
        {
            icon: IconAlertTriangle,
            title: "Sense of Urgency",
            desc: "Beware of 'Account Suspended' or 'Immediate Action Required' messages designed to make you panic.",
            color: "orange"
        },
        {
            icon: IconFingerprint,
            title: "Never Share OTPs",
            desc: "Legitimate companies will NEVER ask for your One-Time Password via call or SMS. Ever.",
            color: "red"
        },
        {
            icon: IconHandStop,
            title: "Identify social engineering",
            desc: "If it sounds too good to be true (Lottery, Unexpected Refund), it's almost certainly a scam.",
            color: "cyan"
        }
    ]

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="home-hero">
                <div className="hero-mesh"></div>
                <Container size="lg">
                    <Stack align="center" gap="xl" py={120} className="relative-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="mono-label" variant="outline" color="cyan" size="lg" radius="xs" style={{ borderStyle: 'dashed' }}>
                                [ PROTECTING_YOUR_DIGITAL_WORLD ]
                            </Badge>
                        </motion.div>

                        <Title className="hero-title animate-shine" order={1}>
                            Protect Your <br /> <span className="text-glow">Digital Identity</span>
                        </Title>

                        <Text className="hero-description" size="xl" ta="center">
                            Leveraging AI detection and behavioral analysis <br />
                            to stop phishing threats before they compromise your data.
                        </Text>

                        <Group mt="xl" gap="xl">
                            <Button component={Link} to="/detection" size="xl" className="premium-btn">
                                Start Scan
                            </Button>
                            <Button component={Link} to="/learning" variant="filled" size="xl" className="secondary-btn">
                                Learning Center
                            </Button>
                        </Group>
                    </Stack>
                </Container>
            </div>

            {/* News Feed */}
            <Container size="lg" py={100}>
                <Group justify="space-between" mb={60}>
                    <div>
                        <Text className="mono-label" color="cyan" mb={5}>[ SECURITY_ALERTS ]</Text>
                        <Title order={2} c="white" style={{ fontSize: '2.5rem', letterSpacing: '-1px' }}>Global Threat Feed</Title>
                    </div>
                </Group>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                    {news.map((item, index) => (
                        <Card key={index} className="premium-box" padding="xl">
                            <Group justify="space-between" mb="md">
                                <Badge color="cyan" variant="filled" size="xs" radius="xs" style={{ fontFamily: 'JetBrains Mono' }}>{item.category}</Badge>
                                <Text size="10px" className="mono-label" opacity={0.5}>{item.date}</Text>
                            </Group>

                            <Text fw={900} size="lg" mb="sm" className="card-hover-text" style={{ letterSpacing: '0.5px' }}>
                                {item.title}
                            </Text>

                            <Text size="xs" c="dimmed" lineClamp={3} mb="xl" style={{ fontFamily: 'JetBrains Mono', lineHeight: 1.6 }}>
                                {item.desc}
                            </Text>

                            <Button
                                component="a"
                                href={item.url}
                                target="_blank"
                                variant="outline"
                                size="xs"
                                fullWidth
                                rightSection={<IconExternalLink size={14} />}
                                className="read-more-btn"
                            >
                                Read More
                            </Button>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>

            {/* Guidelines Section */}
            <div className="guidelines-section py-80" style={{ padding: '100px 0' }}>
                <Container size="lg">
                    <Stack align="center" mb={80}>
                        <Text className="mono-label" color="cyan" mb={5}>[ SAFETY_GUIDE ]</Text>
                        <Title order={2} ta="center" c="white" style={{ fontSize: '3rem' }}>Safety Best Practices</Title>
                        <Text c="dimmed" ta="center" maw={600} size="sm" style={{ fontFamily: 'JetBrains Mono' }}>
                            Master the core defensive strategies to identify and prevent common phishing and social engineering attacks.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
                        {guidelines.map((guide, idx) => (
                            <Paper key={idx} className="guide-box" p="xl">
                                <ThemeIcon size={54} radius="md" variant="light" color="cyan" mb="xl" style={{ background: 'rgba(0,242,255,0.05)' }}>
                                    <guide.icon size={28} />
                                </ThemeIcon>
                                <Title order={4} mb="md" c="white">{guide.title.toUpperCase()}</Title>
                                <Text size="xs" c="dimmed" style={{ lineHeight: 1.6, fontFamily: 'JetBrains Mono' }}>{guide.desc}</Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>
            </div>

            {/* About / Tech Section */}
            <Container size="lg" py={120}>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} align="center">
                    <Stack gap="xl">
                        <Text className="mono-label" color="cyan">[ HOW_IT_WORKS ]</Text>
                        <Title order={2} className="text-glow" style={{ fontSize: '3rem' }}>Smart Detection Engine</Title>
                        <Text size="sm" c="dimmed" style={{ fontFamily: 'JetBrains Mono', lineHeight: 1.8 }}>
                            PhishGuard uses a combination of AI models and visual analysis to verify the legitimacy of URLs, images, and text content.
                        </Text>

                        <List
                            spacing="lg"
                            size="sm"
                            center
                            className="tech-list"
                            icon={
                                <ThemeIcon color="cyan" size={24} radius="xl" variant="light">
                                    <IconShieldCheck style={{ width: rem(16), height: rem(16) }} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>SMART_TEXT_ANALYSIS</List.Item>
                            <List.Item>VISUAL_SCANNING</List.Item>
                            <List.Item>URL_SAFETY_CHECK</List.Item>
                        </List>
                    </Stack>

                    <div className="stat-card-wrapper">
                        <Paper className="premium-box stat-glow" p={60} style={{ borderStyle: 'dashed', borderColor: 'rgba(0,242,255,0.3)' }}>
                            <Stack align="center">
                                <IconShieldCheck size={120} color="#00f2ff" className="floating" />
                                <Title order={1} mt="xl" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>99.9%</Title>
                                <Text className="mono-label" size="xs" color="cyan">SCAN_ACCURACY</Text>
                            </Stack>
                        </Paper>
                    </div>
                </SimpleGrid>
            </Container>
        </div>
    )
}
