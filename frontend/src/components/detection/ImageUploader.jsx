import { Text, Group, Button, Paper, Image, Stack, Title } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX, IconAlertTriangle, IconCheck, IconSearch as IconSearchIcon } from '@tabler/icons-react'
import { useState } from 'react'
import axios from 'axios'
import './ImageUploader.css'

export default function ImageUploader() {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const handleDrop = (files) => {
        setFiles(files)
        setResult(null)
    }

    const handleRemove = () => {
        setFiles([])
        setResult(null)
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleAnalyze = async () => {
        if (files.length === 0) return;

        setLoading(true);
        setResult(null);

        try {
            const base64Image = await convertToBase64(files[0]);
            const response = await axios.post('http://localhost:5001/api/analyze-image', {
                image: base64Image
            });

            const data = response.data;
            setResult({
                safe: data.label === 'SAFE',
                score: data.risk_score,
                riskLevel: data.label,
                reasoning: data.reasons
            });

        } catch (error) {
            console.error("Image analysis error:", error);
            setResult({
                safe: false,
                score: 0,
                riskLevel: 'Error',
                reasoning: 'Failed to analyze image. Please ensure the backend is running.'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="uploader-container">
            {files.length === 0 ? (
                <Dropzone
                    onDrop={handleDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    className="dropzone"
                >
                    <Group justify="center" gap="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload size={50} stroke={1.5} color="#00f2ff" />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={50} stroke={1.5} color="red" />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <div className="upload-icon animate-bounce">
                                <IconPhoto size={50} stroke={1.5} />
                            </div>
                        </Dropzone.Idle>

                        <div style={{ textAlign: 'center' }}>
                            <Text className="mono-label" size="sm" mb={5}>[ UPLOAD_IMAGE ]</Text>
                            <Text size="xl" inline c="white" fw={800}>
                                DROP IMAGE HERE
                            </Text>
                            <Text size="xs" className="mono-label" mt={10}>
                                MAX_SIZE: 5MB // FORMATS: JPG, PNG, WEBP
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            ) : (
                <Stack className="preview-container animate-fade-in">
                    <Paper className="image-preview" p="md">
                        <div className="mono-label" style={{ marginBottom: '15px' }}>[ IMAGE_SELECTED ]</div>
                        <Image src={URL.createObjectURL(files[0])} radius="md" mah={400} style={{ border: '1px solid rgba(0,242,255,0.2)' }} />
                        <Group justify="center" mt="md">
                            <Button
                                color="red"
                                variant="light"
                                className="remove-btn"
                                onClick={handleRemove}
                                disabled={loading}
                                leftSection={<IconX size={14} />}
                            >
                                REMOVE
                            </Button>
                        </Group>
                    </Paper>

                    {!result && (
                        <Button
                            fullWidth
                            size="lg"
                            className="scan-button"
                            onClick={handleAnalyze}
                            loading={loading}
                            leftSection={<IconSearchIcon size={22} color="#030305" />}
                        >
                            {loading ? 'Scanning...' : 'Scan Image'}
                        </Button>
                    )}

                    {result && (
                        <Paper className={`result-box animate-scale-up ${result.safe ? 'safe' : 'danger'}`} p="xl">
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
                                    CONFIDENCE: {result.score}%
                                </div>
                            </div>

                            <div className="analysis-list">
                                <Text className="mono-label" size="10px" color={result.safe ? 'cyan' : 'red'} mb="sm">[ SCAN_REPORT ]</Text>
                                <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)', padding: '12px', borderLeft: '3px solid currentColor', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', lineHeight: 1.6 }}>
                                    {result.reasoning}
                                </Text>
                            </div>
                        </Paper>
                    )}
                </Stack>
            )}
        </div>
    )
}
