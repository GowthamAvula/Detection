
import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Stack,
    Anchor,
    Box,
    Mark
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import {
    IconBrandGoogle,
    IconShieldLock,
    IconAt,
    IconLock,
    IconRobot,
    IconCode
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('login'); // 'login' | 'register'

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            name: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (type === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email: values.email,
                    password: values.password,
                });
                if (error) throw error;

                notifications.show({
                    title: 'Welcome back!',
                    message: 'Successfully logged in to PhishGuard.',
                    color: 'green',
                });
                navigate(from, { replace: true });
            } else {
                const { error } = await supabase.auth.signUp({
                    email: values.email,
                    password: values.password,
                    options: {
                        data: {
                            full_name: values.name,
                        },
                    },
                });
                if (error) throw error;

                notifications.show({
                    title: 'Registration Successful',
                    message: 'Please check your email to verify your account.',
                    color: 'blue',
                });
                setType('login');
            }
        } catch (error) {
            notifications.show({
                title: 'Authentication Error',
                message: error.message,
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!form.values.email) {
            form.setFieldError('email', 'Please enter your email first');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(form.values.email, {
                redirectTo: `${window.location.origin}/dashboard`
            });
            if (error) throw error;

            notifications.show({
                title: 'Reset link sent',
                message: 'Check your email for the password reset link.',
                color: 'green',
            });
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: error.message,
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        sessionStorage.setItem('demoMode', 'true');
        notifications.show({
            title: 'Demo Access Granted',
            message: 'You are now exploring the Sentinel platform in demo mode.',
            color: 'teal',
            icon: <IconRobot size={16} />,
        });
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>

            <Container size="xl" className="login-master-container">
                <div className="login-split-layout">
                    {/* Left Side: Hero Content */}
                    <div className="login-hero-section animate-fade-in">
                        <div className="hero-content">
                            <Text className="hero-eyebrow" mb="xs">[ ACCESS_RESTRICTED ]</Text>
                            <h1 className="hero-title">
                                WE PROTECT <br />
                                <Mark className="green-highlight">WHAT YOU CAN'T</Mark> <br />
                                SEE.
                            </h1>
                            <Text className="hero-subtitle" mt="xl">
                                AI-powered phishing detection and cyber threat analysis <br />
                                built to protect users in real time.
                            </Text>
                        </div>
                    </div>

                    {/* Right Side: Login Card */}
                    <div className="login-form-section">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="login-glass-card">
                                <Stack align="flex-start" gap={0} mb="xl">
                                    <Text className="card-label" color="#39FF14" size="xs" mb={5}>// SECURE_LOGIN_V2</Text>
                                    <Title order={2} className="card-title">Secure Login</Title>
                                </Stack>

                                <form onSubmit={form.onSubmit(handleSubmit)}>
                                    <Stack gap="lg">
                                        {type === 'register' && (
                                            <TextInput
                                                required
                                                label="Full Name"
                                                placeholder="Enter your full name"
                                                leftSection={<IconShieldLock size={16} color="#39FF14" />}
                                                value={form.values.name}
                                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                                className="cyber-input"
                                            />
                                        )}

                                        <TextInput
                                            required
                                            label="Email Address"
                                            placeholder="user@phishguard.security"
                                            leftSection={<IconAt size={16} color="#39FF14" />}
                                            value={form.values.email}
                                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                            error={form.errors.email}
                                            className="cyber-input"
                                        />

                                        <PasswordInput
                                            required
                                            label="Password"
                                            placeholder="••••••••"
                                            leftSection={<IconLock size={16} color="#39FF14" />}
                                            value={form.values.password}
                                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                            error={form.errors.password}
                                            className="cyber-input"
                                        />
                                    </Stack>

                                    <Button
                                        fullWidth
                                        mt={40}
                                        type="submit"
                                        loading={loading}
                                        className="cyber-login-btn"
                                        size="lg"
                                    >
                                        {type === 'login' ? 'Login Securely' : 'Create Secure Account'}
                                    </Button>

                                    {type === 'login' && (
                                        <Button
                                            fullWidth
                                            variant="outline"
                                            mt="md"
                                            onClick={handleDemoLogin}
                                            className="cyber-demo-btn"
                                            leftSection={<IconRobot size={20} />}
                                        >
                                            Try Demo Platform
                                        </Button>
                                    )}
                                </form>

                                <Group justify="space-between" mt="xl">
                                    <Anchor
                                        component="button"
                                        type="button"
                                        className="cyber-toggle-link"
                                        onClick={() => {
                                            setType(type === 'login' ? 'register' : 'login');
                                            form.reset();
                                        }}
                                    >
                                        {type === 'login'
                                            ? "// Sign Up"
                                            : "// Back to Login"}
                                    </Anchor>
                                    <Anchor
                                        component="button"
                                        size="xs"
                                        color="dimmed"
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot password?
                                    </Anchor>
                                </Group>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <footer className="cyber-footer">
                    <Text size="xs" color="dimmed" opacity={0.4}>
                        SENTINEL_LABS // ADVANCED_CYBER_DEFENSE // 2026
                    </Text>
                </footer>
            </Container>
        </div>
    );
}
