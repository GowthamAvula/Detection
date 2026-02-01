import { Container, Title, Text, SimpleGrid, Card, Image, Group, Badge, Modal, Progress, Button, Paper } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconAlertTriangle, IconShieldCheck, IconArrowLeft, IconExternalLink, IconPackage, IconBrandNetflix, IconBrandWindows } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import './Awareness.css'

export default function Awareness() {
    const [opened, { open, close }] = useDisclosure(false)
    const [selectedCase, setSelectedCase] = useState(null)
    const navigate = useNavigate()

    const cases = [
        {
            id: 'microsoft-phishing',
            type: 'EMAIL',
            title: 'Microsoft Account Phishing',
            description: 'An email impersonating Microsoft, urging immediate action to prevent account suspension.',
            fullDescription: 'This email attempts to trick users into believing their Microsoft account is compromised or requires urgent verification. It typically contains a malicious link designed to harvest credentials.',
            image: '/assets/awareness/email_example.png', // Placeholder, will be replaced by icon
            tags: ['Email', 'Credential Harvesting', 'Urgency'],
            color: 'blue',
            icon: IconBrandWindows,
            redFlags: [
                'Sender email address is suspicious (e.g., not @microsoft.com).',
                'Generic greeting instead of your name.',
                'Urgent language threatening account suspension.',
                'Link points to a non-Microsoft domain (hover to check).',
                'Poor grammar or unusual formatting.'
            ],
            analysis: 'Classic phishing attempt leveraging brand trust and fear of account loss. Always verify sender and URL before clicking.'
        },
        {
            id: 'dhl-smishing',
            type: 'SMS',
            title: 'DHL Delivery Scam (Smishing)',
            description: 'A text message claiming a package delivery issue, prompting you to click a link.',
            fullDescription: 'This SMS message, or "smishing" attack, impersonates a delivery service like DHL. It creates a sense of urgency or curiosity about a package to make the recipient click a fraudulent link, often leading to malware or credential theft.',
            image: '/assets/awareness/smishing.png', // Placeholder, will be replaced by icon
            tags: ['SMS', 'Mobile', 'Malware'],
            color: 'orange',
            icon: IconPackage,
            redFlags: [
                'Unexpected message about a package you didn\'t order.',
                'Link is shortened or uses an unfamiliar domain.',
                'Requests personal information or payment for redelivery.',
                'Grammatical errors or awkward phrasing.',
                'No tracking number or an invalid one.'
            ],
            analysis: 'Smishing attacks are highly effective due to the immediate nature of text messages. Always go directly to the official courier website to track packages.'
        },
        {
            id: 'netflix-login-scam',
            type: 'WEB',
            title: 'Netflix Fake Login Page',
            description: 'A deceptive website designed to look like Netflix login, aiming to steal your credentials.',
            fullDescription: 'Attackers create highly convincing fake login pages for popular services like Netflix. These pages are designed to mimic the legitimate site perfectly, but their URL will be slightly off, and any credentials entered will be stolen.',
            image: '/assets/awareness/fake_login.png', // Placeholder, will be replaced by icon
            tags: ['Web', 'Credential Harvesting', 'Spoofing'],
            color: 'red',
            icon: IconBrandNetflix,
            redFlags: [
                'URL in the address bar is not "netflix.com".',
                'Page loaded from an unexpected email or link.',
                'Requests unusual information (e.g., credit card details on a login page).',
                'Security certificate warnings in the browser.',
                'Slight visual discrepancies or low-resolution logos.'
            ],
            analysis: 'Always manually type URLs for sensitive sites or use bookmarks. Never click on links in suspicious emails or texts that lead to login pages.'
        }
    ]

    // Note: Using placeholders for images since we aren't uploading real ones right now
    // In a real app, these would be actual files in public/assets/awareness/

    return (
        <div className="awareness-page">
            <Container size="lg">
                <Button
                    variant="subtle"
                    color="gray"
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={() => navigate('/learning')}
                    className="back-btn"
                    mb="xl"
                >
                    Back to Hub
                </Button>

                <header className="awareness-header animate-fade-in">
                    <Text className="mono-label" color="cyan" mb={10}>[ PHISHING_EXAMPLES_GALLERY ]</Text>
                    <Title order={1} className="page-title">Awareness <span className="text-glow">Gallery</span></Title>
                    <Text className="subtitle" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono', fontSize: '14px' }}>
                        Learn to identify common phishing patterns through documented real-world examples.
                    </Text>
                </header>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
                    {cases.map((item) => (
                        <Card key={item.id} className="case-card animate-scale-up" p="xl" radius="md">
                            <Card.Section className="card-visual-header">
                                <div className={`visual-icon-glow ${item.color}`}>
                                    <item.icon size={48} stroke={1.5} />
                                </div>
                                <div className="threat-label-overlay">
                                    <Text className="mono-label" size="10px">[ {item.type}_INTEL ]</Text>
                                </div>
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Badge className="mono-label" color="cyan" variant="outline" size="xs">
                                    {item.tags[0]}
                                </Badge>
                                <IconShieldCheck size={16} color="rgba(255,255,255,0.3)" />
                            </Group>

                            <Title order={3} className="case-title" mb="md">{item.title}</Title>
                            <Text size="sm" c="dimmed" mb="xl" style={{ height: '4.8em', overflow: 'hidden' }}>
                                {item.description}
                            </Text>

                            <Button
                                fullWidth
                                variant="outline"
                                className="view-details-btn"
                                onClick={() => {
                                    setSelectedCase(item)
                                    open()
                                }}
                            >
                                VIEW_DETAILS
                            </Button>
                        </Card>
                    ))}
                </SimpleGrid>

                <Modal
                    opened={opened}
                    onClose={close}
                    title={selectedCase ? `[ CASE_STUDY: ${selectedCase.title} ]` : ''}
                    size="lg"
                    centered
                    classNames={{
                        header: 'modal-header',
                        title: 'modal-title',
                        content: 'modal-content',
                    }}
                >
                    {selectedCase && (
                        <div className="case-details">
                            <div className="visual-placeholder shadow-glow">
                                <selectedCase.icon size={80} stroke={1} opacity={0.5} />
                                <div className="placeholder-text">
                                    <Text className="mono-label" size="xs">THREAT_VISUAL_SIMULATION</Text>
                                    <Progress value={100} size="sm" color={selectedCase.color} radius="xl" animated />
                                </div>
                            </div>

                            <div className="analysis-box">
                                <Text className="mono-label" size="xs" color="cyan" mb="sm">[ ANALYSIS_SUMMARY ]</Text>
                                <Text size="sm" mb="xl">{selectedCase.fullDescription}</Text>

                                <Text className="mono-label" size="xs" color="red" mb="sm">[ RED_FLAGS ]</Text>
                                <ul className="red-flags-list">
                                    {selectedCase.redFlags.map((flag, idx) => (
                                        <li key={idx}><Text size="xs">{flag}</Text></li>
                                    ))}
                                </ul>

                                <Paper bg="rgba(0,242,255,0.05)" p="md" mt="xl" style={{ borderLeft: '3px solid #00f2ff' }}>
                                    <Text className="mono-label" size="10px" color="cyan" mb={5}>EXPERT_VERDICT</Text>
                                    <Text size="xs" italic>{selectedCase.analysis}</Text>
                                </Paper>
                            </div>
                        </div>
                    )}
                </Modal>
            </Container>
        </div>
    )
}
