import { Container, Title, Text, Button, Paper, Radio, Group, Progress } from '@mantine/core'
import { useState } from 'react'
import { IconCheck, IconX, IconTrophy } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import './Quiz.css'

const questions = [
    {
        id: 1,
        question: "You receive an email from 'paypaI.com' (notice the capital 'i') asking you to reset your password. What should you do?",
        options: [
            { text: "Click the link and reset immediately", correct: false },
            { text: "Reply to ask if it's real", correct: false },
            { text: "Delete the email and go to PayPal.com directly", correct: true },
            { text: "Forward it to a friend", correct: false }
        ],
        explanation: "This is a typo-squatting attack. Attackers use look-alike domains to trick you. Always go to the official site directly."
    },
    {
        id: 2,
        question: "Your CEO emails you asking for a wire transfer urgently. It looks like their email address.",
        options: [
            { text: "Send the money immediately", correct: false },
            { text: "Verify the request via a phone call or internal chat", correct: true },
            { text: "Ignore it", correct: false },
            { text: "Email back asking for account details", correct: false }
        ],
        explanation: "This is a 'Business Email Compromise' (BEC) attack. Always verify urgent financial requests through a secondary channel."
    },
    {
        id: 3,
        question: "Which of these is a sign of a secure website?",
        options: [
            { text: "It has a professional logo", correct: false },
            { text: "The URL starts with https:// and has a padlock icon", correct: true },
            { text: "It asks for your credit card", correct: false },
            { text: "It has no popups", correct: false }
        ],
        explanation: "HTTPS ensures encryption between your browser and the server. However, phishing sites can also use HTTPS, so it's not the only factor."
    }
]

export default function Quiz() {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizComplete, setQuizComplete] = useState(false)

    const handleAnswer = (value) => {
        setSelectedAnswer(parseInt(value))
        setShowResult(true)

        if (questions[activeQuestion].options[parseInt(value)].correct) {
            setScore(s => s + 1)
        }
    }

    const handleNext = () => {
        if (activeQuestion < questions.length - 1) {
            setActiveQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            setQuizComplete(true)
        }
    }

    const restartQuiz = () => {
        setActiveQuestion(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setQuizComplete(false)
    }

    if (quizComplete) {
        return (
            <div className="quiz-page">
                <Container size="sm">
                    <Paper className="quiz-card complete animate-fade-in shadow-glow">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                        >
                            <IconTrophy size={100} color="#00f2ff" style={{ filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.4))' }} />
                        </motion.div>

                        <Text className="mono-label" mt="xl" color="cyan">[ QUIZ_COMPLETE ]</Text>
                        <Title order={1} c="white" mt="xs" style={{ fontSize: '2.5rem' }}>Your Results</Title>

                        <div style={{ margin: '40px 0' }}>
                            <Text className="final-score">{score} / {questions.length}</Text>
                        </div>

                        <Text c="dimmed" maw={400} style={{ fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                            {score === questions.length
                                ? 'EXCELLENT! YOU HAVE A GREAT UNDERSTANDING OF PHISHING DEFENSE.'
                                : 'GOOD EFFORT. WE RECOMMEND REVIEWING OUR LEARNING CENTER TO IMPROVE YOUR DEFENSE SKILLS.'}
                        </Text>

                        <Button size="xl" mt={50} onClick={restartQuiz} className="restart-button">Try Again</Button>
                    </Paper>
                </Container>
            </div>
        )
    }

    const currentQ = questions[activeQuestion]
    const progress = ((activeQuestion) / questions.length) * 100

    return (
        <div className="quiz-page">
            <Container size="md">
                <header className="quiz-header animate-fade-in">
                    <Text className="mono-label" color="cyan">[ SECURITY_CHECK ]</Text>
                    <Title order={1} c="white" className="text-glow">Phishing Quiz</Title>
                </header>

                <Paper className="quiz-card animate-scale-up">
                    <div className="quiz-progress">
                        <Group justify="space-between" mb="xs">
                            <Text className="mono-label" size="9px" opacity={0.5}>QUESTION_{activeQuestion + 1}_OF_{questions.length}</Text>
                            <Text className="mono-label" size="9px" color="cyan">{Math.round(progress)}%_DONE</Text>
                        </Group>
                        <Progress value={progress} size="xs" color="cyan" className="progress-bar" />
                    </div>

                    <div style={{ margin: '60px 0' }}>
                        <Text className="mono-label" size="xs" color="cyan" mb="md">[ QUESTION ]</Text>
                        <Title order={3} c="white" style={{ lineHeight: 1.4, letterSpacing: '0.5px' }}>{currentQ.question}</Title>
                    </div>

                    <Radio.Group value={selectedAnswer?.toString()} onChange={handleAnswer} name="quiz-options">
                        <div className="options-stack">
                            {currentQ.options.map((opt, index) => (
                                <Radio.Card
                                    key={index}
                                    value={index.toString()}
                                    className={`quiz-option ${showResult ? (opt.correct ? 'correct' : (selectedAnswer === index ? 'wrong' : '')) : ''}`}
                                    disabled={showResult}
                                >
                                    <Group wrap="nowrap">
                                        <Radio.Indicator color="cyan" />
                                        <div style={{ flex: 1 }}>
                                            <Text className="option-text">{opt.text}</Text>
                                        </div>
                                        {showResult && opt.correct && <IconCheck size={20} color="#00f2ff" />}
                                        {showResult && selectedAnswer === index && !opt.correct && <IconX size={20} color="#ff4d4d" />}
                                    </Group>
                                </Radio.Card>
                            ))}
                        </div>
                    </Radio.Group>

                    {showResult && (
                        <motion.div
                            className="explanation-box"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Group mb="xs">
                                <Text className="mono-label" size="xs" color={questions[activeQuestion].options[selectedAnswer].correct ? 'cyan' : 'red'}>
                                    {questions[activeQuestion].options[selectedAnswer].correct ? '[ CORRECT ]' : '[ INCORRECT ]'}
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed" style={{ fontFamily: 'JetBrains Mono', lineHeight: 1.6 }}>{currentQ.explanation}</Text>
                            <Group justify="flex-end" mt="xl">
                                <Button className="secondary-btn" size="sm" onClick={handleNext}>
                                    {activeQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                                </Button>
                            </Group>
                        </motion.div>
                    )}
                </Paper>
            </Container>
        </div>
    )
}
