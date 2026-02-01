import { Textarea, Button, Paper, Text, Group, LoadingOverlay, Alert, Divider, Title } from '@mantine/core'
import { IconSearch, IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'
import './TextScanner.css'

import axios from 'axios'

export default function TextScanner() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleScan = async () => {
        if (!text.trim()) return

        setLoading(true)
        setResult(null)

        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5001'
            const response = await axios.post(`${apiUrl}/api/detect`, {
                content: text
            })

            const data = response.data
            const isSafe = data.label === 'SAFE'

            // Handle naming conventions and type conversion
            const rawRisk = data.risk_score !== undefined ? data.risk_score : (data.riskScore !== undefined ? data.riskScore : 0);
            const riskValue = Number(rawRisk);
            const displayScore = isSafe ? (100 - riskValue) : riskValue

            setResult({
                safe: isSafe,
                score: Math.max(0, Math.min(100, displayScore)),
                riskLevel: data.label,
                details: [data.reasons]
            })

        } catch (error) {
            console.error("Detection error:", error)
            setResult({
                safe: false,
                score: 0,
                riskLevel: 'Error',
                details: ['Failed to connect to detection service. Please ensure the backend is running.']
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="scanner-container">
            <div className="input-area">
                <Text className="mono-label" mb="xs">[ PASTE_TEXT_HERE ]</Text>
                <Textarea
                    placeholder="Paste email headers, SMS payloads, or suspicious URLs..."
                    minRows={8}
                    size="md"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    classNames={{ input: 'scanner-input' }}
                />
                <div className="char-count">LENGTH: {text.length} / 2000</div>

                <Group justify="flex-end" mt="xl">
                    <Button
                        size="lg"
                        className="scan-button"
                        onClick={handleScan}
                        disabled={!text.trim() || loading}
                        leftSection={<IconSearch size={22} color="#030305" />}
                    >
                        {loading ? 'Scanning...' : 'Scan Now'}
                    </Button>
                </Group>
            </div>

            {result && (
                <Paper className={`result-box animate-scale-up ${result.safe ? 'safe' : 'danger'}`}>
                    <div className="result-header">
                        <div className="icon-pulse">
                            {result.safe ? <IconCheck size={36} /> : <IconAlertTriangle size={36} />}
                        </div>
                        <div>
                            <Text className="mono-label" size="9px" opacity={0.6}>
                                [ {result.safe ? 'SCAN_COMPLETE' : 'THREAT_DETECTED'} ]
                            </Text>
                            <Title order={3} c="white">{result.safe ? 'SECURE' : 'DANGER'}</Title>
                        </div>
                        <div className="score-badge">
                            {result.safe ? 'SAFETY' : 'RISK'}: {result.score}%
                        </div>
                    </div>

                    <div className="analysis-list">
                        <Text className="mono-label" size="10px" color={result.safe ? 'cyan' : 'red'} mb="sm">[ SCAN_REPORT ]</Text>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {result.details.map((detail, idx) => (
                                <li key={idx} style={{ color: 'rgba(255,255,255,0.9)', padding: '12px', borderLeft: '3px solid currentColor', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', lineHeight: 1.6, marginBottom: '8px' }}>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Paper>
            )}
        </div>
    )
}
