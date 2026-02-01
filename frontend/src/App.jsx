import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Sidebar from './components/common/Sidebar'
import LandingHeader from './components/common/LandingHeader'
import Detection from './pages/Detection'
import URLChecker from './pages/URLChecker'
import EmailAnalyzer from './pages/EmailAnalyzer'
import Awareness from './pages/Awareness'
import Learning from './pages/Learning'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import Report from './pages/Report'
import Community from './pages/Community'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AuthGuard from './components/common/AuthGuard'
import Demo from './pages/Demo'
import About from './pages/About'

function App() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const isLoginPage = location.pathname === '/login';
    const isLandingPage = location.pathname === '/' || location.pathname === '/about';
    const isDemoMode = sessionStorage.getItem('demoMode') === 'true';

    // Show sidebar if NOT on login/landing page AND (either logged in OR in demo mode)
    const showSidebar = !isLoginPage && !isLandingPage && (user || isDemoMode);
    // Show top header ONLY on landing/about pages
    const showLandingHeader = isLandingPage;

    return (
        <div className="app">
            {showLandingHeader && <LandingHeader />}
            {showSidebar && <Sidebar />}
            <main className={showSidebar ? "main-content" : "full-content"}>
                <Routes>
                    <Route path="/" element={<Demo />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
                    <Route path="/detection" element={<AuthGuard><Detection /></AuthGuard>} />
                    <Route path="/url-checker" element={<AuthGuard><URLChecker /></AuthGuard>} />
                    <Route path="/email-analyzer" element={<AuthGuard><EmailAnalyzer /></AuthGuard>} />
                    <Route path="/awareness" element={<AuthGuard><Awareness /></AuthGuard>} />
                    <Route path="/learning" element={<AuthGuard><Learning /></AuthGuard>} />
                    <Route path="/quiz" element={<AuthGuard><Quiz /></AuthGuard>} />
                    <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                    <Route path="/community" element={<AuthGuard><Community /></AuthGuard>} />
                    <Route path="/report" element={<AuthGuard><Report /></AuthGuard>} />
                </Routes>
            </main>
        </div>
    )
}

export default App
