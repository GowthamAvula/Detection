import { Container, Title, Text, SimpleGrid, Paper, Badge, Group, Button, Stack, ThemeIcon, List, rem, Divider, Card, Image, Box } from '@mantine/core'
import { IconShieldCheck, IconAlertTriangle, IconSearch, IconUsers, IconBook, IconTrophy, IconArrowRight, IconLock, IconGlobe, IconFingerprint, IconShieldLock, IconTerminal2 } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Demo.css'

export default function Demo() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setIsDemo(sessionStorage.getItem('demoMode') === 'true');
        }
        checkUser();
    }, []);

    const features = [
        {
            icon: IconSearch,
            title: "Detection Lab",
            desc: "Advanced AI engine to analyze text and images for phishing indicators.",
            to: "/detection",
            color: "cyan",
            preview: "AI_MODEL_V4.2_ACTIVE"
        },
        {
            icon: IconGlobe,
            title: "URL Scanner",
            desc: "Safety scan for suspicious links and malicious domain behaviors.",
            to: "/url-checker",
            color: "blue",
            preview: "DOMAIN_HEURISTICS_SCAN"
        },
        {
            icon: IconTerminal2,
            title: "Email Analyzer",
            desc: "Deep inspection of raw email headers and technical metadata.",
            to: "/email-analyzer",
            color: "purple",
            preview: "HEADER_PACKET_INSPECTION"
        },
        {
            icon: IconUsers,
            title: "Community Alerts",
            desc: "Real-time threat feed contributed by our global security network.",
            to: "/community",
            color: "orange",
            preview: "PHISH_REPORTS_LIVE"
        },
        {
            icon: IconBook,
            title: "Learning Center",
            desc: "Master the fundamental skills to identify social engineering.",
            to: "/learning",
            color: "teal",
            preview: "SECURITY_AWARENESS_HUB"
        },
        {
            icon: IconTrophy,
            title: "Knowledge Quiz",
            desc: "Test your defensive proficiency and earn security clearance.",
            to: "/quiz",
            color: "pink",
            preview: "ASSESS_CYBER_DEFENSE"
        }
    ];

    const hasAccess = user || isDemo;

    const handleAccess = (to) => {
        if (hasAccess) {
            navigate(to);
        } else {
            navigate('/login', { state: { from: to } });
        }
    }

    return (
        <div className="demo-page">
            {/* Animated Grid Background */}
            <div className="demo-bg">
                <div className="grid-overlay"></div>
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
            </div>

            <Container size="xl" py={120}>
                {/* Hero section */}
                <Stack align="center" gap="lg" mb={100}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mono-label" variant="outline" color="cyan" size="lg" radius="xs" style={{ borderStyle: 'dashed', padding: '12px 20px' }}>
                            [ PHISHGUARD_PLATFORM ]
                        </Badge>
                    </motion.div>

                    <Title className="demo-hero-title animate-shine" order={1} ta="center">
                        Experience the Future of <br />
                        <span className="text-glow">Anti-Phishing Defense</span>
                    </Title>

                    <Text className="demo-description" size="xl" ta="center" maw={700}>
                        PhishGuard combines AI-driven analysis with community intelligence
                        to provide a comprehensive shield against tactical deception.
                    </Text>

                    {hasAccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button
                                component={Link}
                                to="/dashboard"
                                size="xl"
                                className="demo-auth-btn"
                                leftSection={<IconShieldCheck size={20} />}
                            >
                                OPEN_DASHBOARD
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button
                                component={Link}
                                to="/login"
                                size="xl"
                                className="demo-auth-btn"
                                leftSection={<IconShieldLock size={20} />}
                            >
                                LOGIN_TO_START
                            </Button>
                        </motion.div>
                    )}
                </Stack>

                {/* Features Grid */}
                <Box className="features-showcase">
                    <Text className="mono-label section-label" ta="center" mb="xl" color="cyan">[ CORE_FEATURES ]</Text>

                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={40}>
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Paper className="feature-demo-card" p={40}>
                                    <div className="card-top">
                                        <ThemeIcon size={64} radius="xl" variant="light" color={feature.color} className="feature-icon">
                                            <feature.icon size={32} />
                                        </ThemeIcon>
                                        <Badge variant="dot" color={feature.color} className="card-preview-tag">{feature.preview}</Badge>
                                    </div>

                                    <Title order={3} mt="xl" mb="md" c="white">{feature.title}</Title>
                                    <Text size="sm" c="dimmed" mb="xl" style={{ fontFamily: 'JetBrains Mono', lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </Text>

                                    <Divider opacity={0.05} mb="xl" />

                                    <Button
                                        fullWidth
                                        variant="outline"
                                        color={feature.color}
                                        className="feature-access-btn"
                                        onClick={() => handleAccess(feature.to)}
                                        rightSection={<IconArrowRight size={16} />}
                                    >
                                        {hasAccess ? 'Open Module' : 'Login to Start'}
                                    </Button>
                                </Paper>
                            </motion.div>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Footer Deco */}
                <Stack align="center" mt={120}>
                    <Group gap="xl">
                        <div className="deco-tag">AI_POWERED</div>
                        <div className="deco-dot"></div>
                        <div className="deco-tag">ZERO_TRUST</div>
                        <div className="deco-dot"></div>
                        <div className="deco-tag">REALTIME_PROTECTION</div>
                    </Group>
                    <Text size="xs" color="dimmed" mt="xl" className="mono-label" opacity={0.3}>
                        PHISHGUARD // PLATFORM_v2.0
                    </Text>
                </Stack>
            </Container>
        </div>
    )
}
