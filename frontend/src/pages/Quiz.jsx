import { Container, Title, Text, Button, Paper, Radio, Group, Progress } from '@mantine/core'
import { useState } from 'react'
import { IconCheck, IconX, IconTrophy } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import './Quiz.css'

const allQuestions = [
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
    },
    {
        id: 4,
        question: "You get a text message (SMS) from 'Your Bank' saying your account is locked and providing a link to unlock it. What is this called?",
        options: [
            { text: "Vishing", correct: false },
            { text: "Smishing", correct: true },
            { text: "Spear Phishing", correct: false },
            { text: "Whaling", correct: false }
        ],
        explanation: "Smishing is phishing via SMS. Banks will never send you a link to 'unlock' your account via text."
    },
    {
        id: 5,
        question: "A stranger calls your work phone claiming to be from the IT department and asks for your password to fix a 'server issue'. What should you do?",
        options: [
            { text: "Give them the password so they can fix the server", correct: false },
            { text: "Tell them you'll call them back on the official IT extension", correct: true },
            { text: "Give them a fake password", correct: false },
            { text: "Ask them for their name and then give the password", correct: false }
        ],
        explanation: "This is 'Vishing' (Voice Phishing). Legitimate IT departments will never ask for your password over the phone."
    },
    {
        id: 6,
        question: "You see a QR code on a public flyer offering free coffee. Scanning it takes you to a login page for your email. What type of attack is this?",
        options: [
            { text: "Quishing", correct: true },
            { text: "Bar-Phishing", correct: false },
            { text: "Code-Scam", correct: false },
            { text: "Optical Phishing", correct: false }
        ],
        explanation: "Quishing is phishing via QR codes. Attackers use them to direct users to malicious websites that harvest credentials."
    },
    {
        id: 7,
        question: "An email tells you that you have an 'Unclaimed Tax Refund' and asks you to open a PDF attachment to fill out a form. What is the danger?",
        options: [
            { text: "The form might be too long", correct: false },
            { text: "The PDF could contain malware or a link to a credential-harvesting site", correct: true },
            { text: "There is no danger if you don't send money", correct: false },
            { text: "You might get too much money back", correct: false }
        ],
        explanation: "Malicious attachments are common in phishing. They can infect your computer with malware as soon as they are opened."
    },
    {
        id: 8,
        question: "A message from a friend on social media says 'Look at this video of you!' with a link. What should you do?",
        options: [
            { text: "Click it out of curiosity", correct: false },
            { text: "Message your friend through a different app to see if they sent it", correct: true },
            { text: "Report your friend for harassment", correct: false },
            { text: "Click it and log in to see the video", correct: false }
        ],
        explanation: "Compromised social media accounts are used to spread phishing links to friends and family."
    },
    {
        id: 9,
        question: "What does 'Spear Phishing' mean?",
        options: [
            { text: "Phishing using a physical spear", correct: false },
            { text: "A broad phishing campaign sent to millions", correct: false },
            { text: "A highly targeted phishing attack aimed at a specific individual or organization", correct: true },
            { text: "An attack that only targets fishermen", correct: false }
        ],
        explanation: "Spear phishing is highly personalized, making it more difficult to detect than generic phishing emails."
    },
    {
        id: 10,
        question: "A pop-up window on your computer says it's infected with 50 viruses and gives a 'Tech Support' number to call. What is this?",
        options: [
            { text: "A helpful system notification", correct: false },
            { text: "A 'Fake Technical Support' scam", correct: true },
            { text: "A sign you need to buy a new computer", correct: false },
            { text: "An actual virus scan result", correct: false }
        ],
        explanation: "Browsers cannot scan your entire computer for viruses. These pop-ups are designed to scare you into calling a scammer."
    },
    {
        id: 11,
        question: "You receive an MFA (Multi-Factor Authentication) prompt on your phone for an account you aren't currently logging into. What should you do?",
        options: [
            { text: "Approve it just in case so you don't get locked out", correct: false },
            { text: "Deny the request and change your password immediately", correct: true },
            { text: "Ignore it and hope it goes away", correct: false },
            { text: "Wait for the next one and then approve it", correct: false }
        ],
        explanation: "This is an 'MFA Fatigue' or 'MFA Push' attack. Denying the request and changing your password is the safest course of action."
    },
    {
        id: 12,
        question: "Which of the following is the most likely indicator of a phishing email?",
        options: [
            { text: "A sender address that doesn't match the company name", correct: true },
            { text: "An email with a colorful background", correct: false },
            { text: "An email that addresses you by your full name", correct: false },
            { text: "An email from a known contact", correct: false }
        ],
        explanation: "Mismatched sender addresses are a common red flag. Always check the actual email address, not just the display name."
    }
];

export default function Quiz() {
    const [dailyQuestions, setDailyQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizComplete, setQuizComplete] = useState(false)

    // Select questions daily based on simple date-based seed
    useState(() => {
        const today = new Date().toDateString();
        const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // Simple seeded shuffle
        const shuffled = [...allQuestions].sort(() => {
            const random = Math.sin(seed) * 10000;
            return (random - Math.floor(random)) - 0.5;
        });

        // Limit to 10 questions
        setDailyQuestions(shuffled.slice(0, 10));
    });

    const handleAnswer = (value) => {
        const index = parseInt(value);
        setSelectedAnswer(index)
        setShowResult(true)

        if (dailyQuestions[activeQuestion].options[index].correct) {
            setScore(s => s + 1)
        }
    }

    const handleNext = () => {
        if (activeQuestion < dailyQuestions.length - 1) {
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

    if (dailyQuestions.length === 0) return null;

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
                            <Text className="final-score">{score} / {dailyQuestions.length}</Text>
                        </div>

                        <Text c="dimmed" maw={400} style={{ fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                            {score === dailyQuestions.length
                                ? 'EXCELLENT! YOU HAVE A GREAT UNDERSTANDING OF PHISHING DEFENSE.'
                                : 'GOOD EFFORT. WE RECOMMEND REVIEWING OUR LEARNING CENTER TO IMPROVE YOUR DEFENSE SKILLS.'}
                        </Text>

                        <Button size="xl" mt={50} onClick={restartQuiz} className="restart-button">Try Again</Button>
                    </Paper>
                </Container>
            </div>
        )
    }

    const currentQ = dailyQuestions[activeQuestion]
    const progress = (activeQuestion / dailyQuestions.length) * 100

    return (
        <div className="quiz-page">
            <Container size="md">
                <header className="quiz-header animate-fade-in">
                    <Text className="mono-label" color="cyan">[ SECURITY_CHECK ]</Text>
                    <Title order={1} c="white" className="text-glow">Phishing Quiz</Title>
                    <Text size="xs" color="dimmed" mt="xs" style={{ fontFamily: 'JetBrains Mono' }}>
                        NEW CHALLENGES EVERY 24H // SEED: {new Date().toLocaleDateString()}
                    </Text>
                </header>

                <Paper className="quiz-card animate-scale-up">
                    <div className="quiz-progress">
                        <Group justify="space-between" mb="xs">
                            <Text className="mono-label" size="9px" opacity={0.5}>QUESTION_{activeQuestion + 1}_OF_{dailyQuestions.length}</Text>
                            <Text className="mono-label" size="9px" color="cyan">{Math.round(progress)}%_DONE</Text>
                        </Group>
                        <Progress value={progress} size="xs" color="cyan" className="progress-bar" />
                    </div>

                    <div style={{ margin: '60px 0' }}>
                        <Text className="mono-label" size="xs" color="cyan" mb="md">[ QUESTION ]</Text>
                        <Title order={3} c="white" style={{ lineHeight: 1.4, letterSpacing: '0.5px' }}>{currentQ.question}</Title>
                    </div>

                    <Radio.Group
                        value={selectedAnswer !== null ? selectedAnswer.toString() : ''}
                        onChange={handleAnswer}
                        name="quiz-options"
                    >
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
                                <Text className="mono-label" size="xs" color={dailyQuestions[activeQuestion].options[selectedAnswer].correct ? 'cyan' : 'red'}>
                                    {dailyQuestions[activeQuestion].options[selectedAnswer].correct ? '[ CORRECT ]' : '[ INCORRECT ]'}
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed" style={{ fontFamily: 'JetBrains Mono', lineHeight: 1.6 }}>{currentQ.explanation}</Text>
                            <Group justify="flex-end" mt="xl">
                                <Button className="secondary-btn" size="sm" onClick={handleNext}>
                                    {activeQuestion < dailyQuestions.length - 1 ? 'Next Question' : 'View Results'}
                                </Button>
                            </Group>
                        </motion.div>
                    )}
                </Paper>
            </Container>
        </div>
    )
}
