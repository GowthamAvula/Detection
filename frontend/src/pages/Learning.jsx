import { Container, Title, Text, Accordion, Timeline, ThemeIcon, Paper, Stack, Group, Progress, Badge, SimpleGrid, Button, Divider } from '@mantine/core'
import { IconSchool, IconShieldCheck, IconAlertTriangle, IconLock, IconUserExclamation, IconQrcode, IconRobot, IconBuildingSkyscraper, IconShare, IconDeviceDesktop, IconArrowRight } from '@tabler/icons-react'
import './Learning.css'

export default function Learning() {
    const modules = [
        {
            category: "Fundamentals",
            icon: IconSchool,
            color: "cyan",
            items: [
                {
                    id: "basics",
                    title: "Phishing 101",
                    description: "Learn the core mechanics of social engineering and how attackers exploit trust.",
                    details: "Phishing is the foundation of most cyberattacks. It involves misdirection to trick users into providing credentials or installing malware.",
                    link: "/awareness"
                },
                {
                    id: "types",
                    title: "Common Attack Vectors",
                    description: "Spear phishing, Whaling, and Smishing explained in simple terms.",
                    details: "Attackers tailor their methods: Spear phishing targets individuals, Whaling targets executives, and Smishing uses SMS messages.",
                    link: "/awareness"
                }
            ]
        },
        {
            category: "Emerging Threats",
            icon: IconRobot,
            color: "violet",
            items: [
                {
                    id: "ai",
                    title: "AI & Deepfakes",
                    description: "How artificial intelligence is used to clone voices and faces in high-tech scams.",
                    details: "AI can now mimic voices and generate realistic video (Deepfakes). Attackers use these to impersonate coworkers or family members in urgent requests.",
                    link: "https://www.aura.com/learn/ai-scams"
                },
                {
                    id: "qr",
                    title: "QR Code Security",
                    description: "The rise of 'Quishing'—why you should be careful with public QR codes.",
                    details: "QR codes can hide malicious URLs. Only scan codes from trusted sources, and check the destination URL before interacting.",
                    link: "/awareness"
                }
            ]
        },
        {
            category: "Defense Strategies",
            icon: IconShieldCheck,
            color: "blue",
            items: [
                {
                    id: "workplace",
                    title: "Workplace Security",
                    description: "Identifying Business Email Compromise (BEC) and fake IT requests.",
                    details: "Scammers often impersonate CEOs or IT support. Always verify requests for money or sensitive data through a secondary channel.",
                    link: "https://www.cisa.gov/news-events/news/securing-business-email-compromise"
                },
                {
                    id: "social",
                    title: "Social Media Safety",
                    description: "Protecting your accounts from giveaway fraud and verification scams.",
                    details: "Fraudulent accounts often promise prizes or threaten account deletion to steal 'verification codes' or login data.",
                    link: "https://consumer.ftc.gov/articles/how-avoid-social-media-scams"
                }
            ]
        }
    ]

    return (
        <div className="learning-page">
            <Container size="xl">
                <header className="learning-header animate-fade-in">
                    <Group justify="space-between" align="flex-end" mb="xl">
                        <div>
                            <Title className="page-title" order={1}>
                                Security <span className="text-glow">Hub</span>
                            </Title>
                        </div>
                    </Group>

                    <Text className="subtitle" size="lg" mt="md" opacity={0.6} maw={700}>
                        Master the art of digital defense. Explore our interactive modules to stay one step ahead of
                        modern phishing techniques and AI-powered deception.
                    </Text>
                </header>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                    {modules.map((category, idx) => (
                        <div key={idx} className="category-group animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Group mb="lg" gap="sm">
                                <ThemeIcon size="lg" radius="md" variant="light" color={category.color}>
                                    <category.icon size={20} />
                                </ThemeIcon>
                                <Text fw={900} size="sm" className="mono-label" tt="uppercase" c={category.color}>
                                    {category.category}
                                </Text>
                            </Group>

                            <Stack gap="xl">
                                {category.items.map((module) => (
                                    <Paper key={module.id} className="learning-card adaptive-card" p="xl">
                                        <div className="card-top">
                                            <Title order={3} mb="sm" className="module-title">{module.title}</Title>
                                            <Text size="sm" c="dimmed" mb="xl" style={{ lineHeight: 1.6 }}>
                                                {module.description}
                                            </Text>
                                        </div>

                                        <Accordion variant="separated" chevronPosition="right" classNames={{ item: 'inner-accordion', control: 'inner-control', content: 'inner-content' }}>
                                            <Accordion.Item value="details">
                                                <Accordion.Control>
                                                    <Text size="xs" fw={700} className="mono-label">VIEW_ANALYSIS</Text>
                                                </Accordion.Control>
                                                <Accordion.Panel>
                                                    <Text size="xs" style={{ lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                                                        {module.details}
                                                    </Text>
                                                </Accordion.Panel>
                                            </Accordion.Item>
                                        </Accordion>

                                        <Divider my="lg" opacity={0.1} />

                                        <Button
                                            variant="subtle"
                                            color={category.color}
                                            fullWidth
                                            component={module.link.startsWith('http') ? 'a' : 'button'}
                                            href={module.link.startsWith('http') ? module.link : undefined}
                                            target={module.link.startsWith('http') ? '_blank' : undefined}
                                            onClick={module.link.startsWith('http') ? undefined : () => window.location.href = module.link}
                                            rightSection={<IconArrowRight size={14} />}
                                            className="module-cta"
                                        >
                                            Access Toolkit
                                        </Button>
                                    </Paper>
                                ))}
                            </Stack>
                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    )
}
