import { Container, Group, Button, Text, rem } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { IconShieldCheck, IconSearch, IconGlobe, IconTerminal2, IconBook, IconTrophy, IconInfoCircle } from '@tabler/icons-react'
import './LandingHeader.css'

export default function LandingHeader() {
    const location = useLocation();

    const features = [
        { label: 'DETECTION LABS', icon: IconSearch, to: '/detection' },
        { label: 'URL SCANNER', icon: IconGlobe, to: '/url-checker' },
        { label: 'DETECTION EMAILS', icon: IconTerminal2, to: '/email-analyzer' },
        { label: 'LEARNING CENTER', icon: IconBook, to: '/learning' },
        { label: 'KNOWLEDGE QUIZ', icon: IconTrophy, to: '/quiz' },
    ]

    return (
        <header className="landing-header-nav">
            <Container size="xl" h="100%">
                <Group justify="space-between" h="100%">
                    <Group gap="sm" component={Link} to="/" style={{ textDecoration: 'none' }}>
                        <IconShieldCheck size={28} color="#00f2ff" />
                        <Text fw={900} size="sm" c="white" className="mono-label" ls={2}>PHISHGUARD</Text>
                    </Group>

                    <nav className="header-nav-links">
                        <Group gap="xl">
                            {features.map((item) => (
                                <Link key={item.label} to={item.to} className="nav-item">
                                    <Group gap={6}>
                                        <item.icon size={16} />
                                        <Text size="xs" fw={700}>{item.label}</Text>
                                    </Group>
                                </Link>
                            ))}
                            <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                                <Group gap={6}>
                                    <IconInfoCircle size={16} />
                                    <Text size="xs" fw={700}>ABOUT</Text>
                                </Group>
                            </Link>
                        </Group>
                    </nav>

                    <Button
                        component={Link}
                        to="/login"
                        variant="filled"
                        className="header-cta"
                        size="xs"
                    >
                        LOGIN
                    </Button>
                </Group>
            </Container>
        </header>
    )
}
