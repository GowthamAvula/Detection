import { Container, Title, Text, Textarea, Button, Paper, Group, FileInput, Select } from '@mantine/core'
import { IconSend, IconUpload, IconInfoCircle } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import './Report.css'

export default function Report() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        // Simulate submission
        setTimeout(() => {
            setLoading(false)
            notifications.show({
                title: 'Report Submitted',
                message: 'Thank you for helping make the internet safer!',
                color: 'green',
                icon: <IconSend size={16} />
            })
        }, 1500)
    }

    return (
        <div className="report-page">
            <Container size="lg">
                <header className="report-header animate-fade-in">
                    <Text className="mono-label" color="cyan" mb={10}>[ NEW_PHISHING_REPORT ]</Text>
                    <Title className="page-title" order={1}>Submit <span className="text-glow">Report</span></Title>
                    <Text className="subtitle" mt="md" opacity={0.6}>
                        Report suspicious websites or messages to help protect the community from cyber threats.
                    </Text>
                </header>

                <Paper className="report-card animate-scale-up shadow-glow">
                    <Text className="mono-label" color="cyan" mb="xl">[ REPORT_FORM_DETAILS ]</Text>

                    <Stack gap="xl">
                        <Select
                            label="REPORT_TYPE"
                            placeholder="Select threat classification"
                            data={['Phishing Website', 'Suspicious Email', 'SMS Scam', 'Fake Social Media', 'Other']}
                            classNames={{ input: 'report-input', label: 'input-label' }}
                        />

                        <Textarea
                            label="SCAM_URL_OR_CONTENT"
                            placeholder="PASTE_SCAM_DETAILS_HERE..."
                            minRows={3}
                            classNames={{ input: 'report-input', label: 'input-label' }}
                        />

                        <Textarea
                            label="ADDITIONAL_CONTEXT"
                            placeholder="Provide any extra details that might help..."
                            minRows={4}
                            classNames={{ input: 'report-input', label: 'input-label' }}
                        />

                        <FileInput
                            label="SCREENSHOT_EVIDENCE (OPTIONAL)"
                            placeholder="UPLOAD_SCREENSHOT"
                            leftSection={<IconUpload size={16} color="#00f2ff" />}
                            classNames={{ input: 'report-input', label: 'input-label' }}
                        />

                        <Group justify="flex-end" mt="xl">
                            <Button
                                size="lg"
                                className="submit-button"
                                onClick={handleSubmit}
                                loading={loading}
                                leftSection={<IconSend size={20} />}
                            >
                                SUBMIT_REPORT
                            </Button>
                        </Group>
                    </Stack>
                </Paper>

                <Paper className="info-card animate-scale-up" mt="xl">
                    <Group align="flex-start" wrap="nowrap">
                        <IconInfoCircle size={32} color="#00f2ff" style={{ opacity: 0.5 }} />
                        <div>
                            <Text className="mono-label" color="cyan" mb="xs">[ WHY_REPORT? ]</Text>
                            <Title order={4} mb="sm" c="white">Community Protection</Title>
                            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6, fontFamily: 'JetBrains Mono' }}>
                                REPORTING PHISHING ATTEMPTS HELPS RESEARCHERS TRACK NEW THREATS AND TAKE DOWN MALICIOUS WEBSITES.
                                YOUR CONTRIBUTION DIRECTLY HELPS KEEP THE COMMUNITY SAFE FROM CYBER ATTACKS.
                            </Text>
                            <Group mt="xl" gap="md">
                                <Badge variant="outline" color="cyan" size="sm" radius="xs" style={{ borderStyle: 'dashed' }}>GLOBAL_SHIELD</Badge>
                                <Badge variant="outline" color="cyan" size="sm" radius="xs" style={{ borderStyle: 'dashed' }}>THREAT_TRACKING</Badge>
                                <Badge variant="outline" color="cyan" size="sm" radius="xs" style={{ borderStyle: 'dashed' }}>SITE_TAKEDOWN</Badge>
                            </Group>
                        </div>
                    </Group>
                </Paper>
            </Container>
        </div>
    )
}

function Stack({ children, gap = "md" }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: gap === "xl" ? "2rem" : "1rem" }}>
            {children}
        </div>
    )
}
// Add Badge to imports at top
import { Badge } from '@mantine/core'
