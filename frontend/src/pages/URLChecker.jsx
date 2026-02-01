import { Container, Title, Text, TextInput, Button, Paper, Alert, Group } from '@mantine/core'
import { IconLink, IconAlertTriangle, IconCheck, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './URLChecker.css'

export default function URLChecker() {
    const [url, setUrl] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCheck = async () => {
        if (!url) return
        setLoading(true)
        setResult(null)

        try {
            // Robust URL parsing for hostname display
            let displayUrl = url;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                displayUrl = 'https://' + url;
            }

            let hostname = 'Unknown Domain';
            try {
                hostname = new URL(displayUrl).hostname;
            } catch (e) {
                hostname = url;
            }


            const apiUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5001'
            const response = await axios.post(`${apiUrl}/api/detect`, {
                content: url
            })

            const data = response.data
            setResult({
                safe: data.label === 'SAFE',
                score: data.risk_score,
                domain: hostname,
                threats: data.label === 'SAFE' ? [] : [data.reasons || 'Suspicious indicators detected']
            })

        } catch (error) {
            console.error("URL scan error:", error)
            setResult({
                safe: false,
                score: 0,
                domain: url,
                threats: ['Failed to connect to scanner service']
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="url-checker-page">
            <Container size="lg">
                <header className="checker-header animate-fade-in">
                    <Text className="mono-label" color="cyan" mb={10}>[ URL_SCANNER ]</Text>
                    <Title className="page-title" order={1}>URL Safety <span className="text-glow">Checker</span></Title>
                    <Text className="subtitle" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono', fontSize: '14px' }}>
                        Scan any link to identify potential phishing threats or malicious behavior
                        before you click.
                    </Text>
                </header>

                <div className="checker-card animate-scale-up">
                    <Text className="mono-label" size="xs" color="cyan" mb="md">[ PASTE_URL_HERE ]</Text>

                    <div className="input-section">
                        <TextInput
                            size="xl"
                            placeholder="https://example.security"
                            leftSection={<IconLink size={18} color="#00f2ff" />}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="url-input"
                        />

                        <Button
                            size="xl"
                            className="check-button"
                            onClick={handleCheck}
                            loading={loading}
                            leftSection={<IconSearch size={18} />}
                        >
                            Scan Now
                        </Button>
                    </div>
                </div>

                {result && (
                    <motion.div
                        className="results-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Paper className={`result-card ${result.safe ? 'safe' : 'danger'}`}>
                            <div className="result-header">
                                <div className={`result-icon ${result.safe ? 'safe' : 'danger'}`}>
                                    {result.safe ? <IconCheck size={32} /> : <IconAlertTriangle size={32} />}
                                </div>
                                <div className="result-summary">
                                    <Text className="mono-label" size="9px" opacity={0.5} mb={2}>[ ANALYSIS_COMPLETE ]</Text>
                                    <Title order={2} c="white" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>
                                        {result.safe ? 'SECURE_LINK' : 'DANGEROUS_LINK'}
                                    </Title>
                                    <Text size="sm" c="dimmed">Safety Score: <span className="score">{result.score}%</span></Text>
                                </div>
                            </div>

                            <div className="result-details">
                                <Group justify="space-between" mb="md">
                                    <Text className="mono-label" size="10px">DOMAIN:</Text>
                                    <Text size="xs" fw={700} c="cyan">{result.domain.toUpperCase()}</Text>
                                </Group>

                                {result.threats.length > 0 && (
                                    <div className="threats-list">
                                        <Text className="mono-label" size="10px" color="red" mb="sm">[ SCAN_REPORT ]</Text>
                                        <ul>
                                            {result.threats.map((threat, index) => (
                                                <li key={index}>{threat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Paper>
                    </motion.div>
                )}
            </Container>
        </div>
    )
}
