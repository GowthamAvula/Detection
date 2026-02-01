import { Container, Title, Text, Tabs, Paper } from '@mantine/core'
import { IconFileText, IconPhoto } from '@tabler/icons-react'
import TextScanner from '../components/detection/TextScanner'
import ImageUploader from '../components/detection/ImageUploader'
import './Detection.css'

export default function Detection() {
    return (
        <div className="detection-page">
            <Container size="lg">
                <header className="detection-header animate-fade-in">
                    <Text className="mono-label" color="cyan" mb={10}>[ DETECTION_ENGINE ]</Text>
                    <Title className="page-title" order={1}>
                        Phishing Detection <span className="text-glow">Lab</span>
                    </Title>
                    <Text className="subtitle">
                        Analyze suspicious text and images to identify potential
                        phishing threats using advanced AI models.
                    </Text>
                </header>

                <Paper className="detection-card animate-scale-up">
                    <Tabs defaultValue="text" variant="pills">
                        <div className="tabs-list-wrapper">
                            <Tabs.List>
                                <Tabs.Tab value="text" leftSection={<IconFileText size={16} />}>
                                    Text Scan
                                </Tabs.Tab>
                                <Tabs.Tab value="image" leftSection={<IconPhoto size={16} />}>
                                    Image Scan
                                </Tabs.Tab>
                            </Tabs.List>
                        </div>

                        <Tabs.Panel value="text" pt="xl">
                            <TextScanner />
                        </Tabs.Panel>

                        <Tabs.Panel value="image" pt="xl">
                            <ImageUploader />
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
            </Container>
        </div>
    )
}
