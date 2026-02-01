import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Sidebar from './components/common/Sidebar'
// import Footer from './components/common/Footer' // Footer removed for dashboard layout
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
    const isDemoMode = sessionStorage.getItem('demoMode') === 'true';
    // Show sidebar if NOT on login page AND (either logged in OR in demo mode OR not on landing page)
    const showSidebar = !isLoginPage && (user || isDemoMode || location.pathname !== '/');

    return (
        <div className="app">
            {showSidebar && <Sidebar />}
            <main className={showSidebar ? "main-content" : "full-content"}>
                <Routes>
                    <Route path="/" element={<Demo />} />
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
