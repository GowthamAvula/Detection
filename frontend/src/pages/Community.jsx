import { useState } from 'react'
import {
    Container, Title, Text, Tabs, SimpleGrid, Paper, Group,
    Badge, Button, Textarea, FileInput, Select, Avatar, ActionIcon, Stack, Image
} from '@mantine/core'
import {
    IconAlertTriangle, IconSend, IconPhoto, IconBrandTwitter,
    IconMessageCircle, IconShare, IconThumbUp, IconFlag
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { motion } from 'framer-motion'
import './Community.css'

export default function Community() {
    const [activeTab, setActiveTab] = useState('feed')
    const [loading, setLoading] = useState(false)

    // Mock Data for Community Feed
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "Sarah Jenkins",
            avatar: null,
            type: "SMS Scam",
            content: "Just received this text claiming my 'netbanking is blocked'. The link goes to 'hdfc-kyc-update.com'. DO NOT CLICK!",
            evidence: "https://placehold.co/600x400/png?text=Fake+SMS+Screenshot",
            riskLevel: "High",
            timestamp: "2 hours ago",
            likes: 24
        },
        {
            id: 2,
            user: "Amit Patel",
            avatar: null,
            type: "Phishing URL",
            content: "Found a fake Amazon offer circulating on WhatsApp. URL is 'amazon-big-billion-days-free.xyz'. Alert your parents!",
            evidence: null,
            riskLevel: "Medium",
            timestamp: "5 hours ago",
            likes: 56
        },
        {
            id: 3,
            user: "System Admin",
            avatar: null,
            type: "Email Spoofing",
            content: "New wave of 'Tax Refund' emails. They use the official logo but the sender is 'refund@incometax-gov.in.net'.",
            evidence: "https://placehold.co/600x400/png?text=Fake+Email+Header",
            riskLevel: "Critical",
            timestamp: "1 day ago",
            likes: 112
        }
    ])

    const handlePost = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            notifications.show({
                title: 'Alert Posted',
                message: 'Community alerted successfully!',
                color: 'teal',
            })
            // Add a mock post
            setPosts([{
                id: Date.now(),
                user: "You",
                avatar: null,
                type: "Suspicious Activity",
                content: "Just reported a new pattern found in Telegram groups.",
                evidence: null,
                riskLevel: "Medium",
                timestamp: "Just now",
                likes: 0
            }, ...posts])
            setActiveTab('feed')
        }, 1500)
    }

    return (
        <div className="community-page">
            <Container size="xl">
                <header className="community-header animate-fade-in">
                    <Text className="mono-label" color="cyan" mb={10}>[ COMMUNITY_SECURITY_ALERTS ]</Text>
                    <Title order={1} className="page-title">Community <span className="text-glow">Watch</span></Title>
                    <Text className="subtitle" size="sm" mt="md" opacity={0.6}>
                        Stay updated with real-time phishing alerts and scams reported by the PhishGuard community.
                    </Text>
                </header>

                <Tabs value={activeTab} onChange={setActiveTab} variant="pills" my="xl">
                    <Group justify="center" mb="xl">
                        <Tabs.List>
                            <Tabs.Tab value="feed" leftSection={<IconMessageCircle size={14} />}>LIVE_ALERTS</Tabs.Tab>
                            <Tabs.Tab value="report" leftSection={<IconAlertTriangle size={14} />}>REPORT_SCAM</Tabs.Tab>
                        </Tabs.List>
                    </Group>

                    <Tabs.Panel value="feed" pt="lg">
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                            {posts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Paper className="post-card">
                                        <Group justify="space-between" mb="lg">
                                            <Group>
                                                <Avatar radius="md" color="cyan" variant="light" style={{ border: '1px solid rgba(0,242,255,0.2)' }}>
                                                    {post.user[0]}
                                                </Avatar>
                                                <div>
                                                    <Text size="sm" fw={800} c="white">{post.user.toUpperCase()}</Text>
                                                    <Text size="10px" className="mono-label" opacity={0.4}>{post.timestamp}</Text>
                                                </div>
                                            </Group>
                                            <Badge
                                                color={post.riskLevel === 'Critical' ? 'red' : post.riskLevel === 'High' ? 'orange' : 'cyan'}
                                                variant="filled"
                                                size="xs"
                                                radius="xs"
                                                style={{ fontFamily: 'JetBrains Mono' }}
                                            >
                                                {post.type.replace(/ /g, '_').toUpperCase()}
                                            </Badge>
                                        </Group>

                                        <Text size="sm" mb="md" c="dimmed" style={{ lineHeight: 1.6, fontFamily: 'JetBrains Mono' }}>
                                            {post.content}
                                        </Text>

                                        <div className="evidence-container">
                                            <Image src={post.evidence} radius="md" alt="Evidence" />
                                            <div className="evidence-badge">EVIDENCE_IMAGE</div>
                                        </div>

                                        <Group mt="xl" justify="space-between">
                                            <Group gap="xs">
                                                <Button size="xs" variant="light" color="cyan" leftSection={<IconThumbUp size={14} />}>
                                                    {post.likes} UPVOTES
                                                </Button>
                                                <Button size="xs" variant="subtle" color="gray" leftSection={<IconShare size={14} />}>
                                                    SHARE
                                                </Button>
                                            </Group>
                                            <Button size="xs" variant="subtle" color="red" leftSection={<IconFlag size={14} />}>
                                                REPORT
                                            </Button>
                                        </Group>
                                    </Paper>
                                </motion.div>
                            ))}
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value="report" pt="lg">
                        <Container size="sm">
                            <Paper className="report-panel shadow-glow">
                                <Text className="mono-label" color="cyan" mb={10}>[ SUBMIT_ALERT ]</Text>
                                <Title order={3} mb="sm" c="white">Report a Scam</Title>
                                <Text size="xs" c="dimmed" mb="xl">
                                    Found a new suspicious link or message? Share it with the community to prevent others from falling victim.
                                </Text>

                                <Stack gap="lg">
                                    <Select
                                        label="SCAM_TYPE"
                                        placeholder="Select type"
                                        data={['Phishing URL', 'SMS Scam', 'Email Spoofing', 'Fake Call', 'Other']}
                                        className="profile-field"
                                    />
                                    <Textarea
                                        label="SCAM_DETAILS"
                                        placeholder="Describe the scam, the message content, sender name, etc."
                                        minRows={4}
                                        className="profile-field"
                                    />
                                    <FileInput
                                        label="EVIDENCE_IMAGE (Screenshot)"
                                        placeholder="Select screenshot"
                                        className="profile-field"
                                        leftSection={<IconPhoto size={16} color="#00f2ff" />}
                                    />
                                    <Button
                                        fullWidth
                                        size="lg"
                                        className="post-btn"
                                        mt="md"
                                        onClick={handlePost}
                                        loading={loading}
                                        leftSection={<IconSend size={20} />}
                                    >
                                        POST_ALERT
                                    </Button>
                                </Stack>
                            </Paper>
                        </Container>
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </div>
    )
}
