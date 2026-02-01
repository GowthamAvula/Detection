import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Button, Group, Box } from '@mantine/core'
import {
    IconHome, IconSearch, IconPhoto, IconLink, IconMail,
    IconBook, IconSchool, IconTarget, IconChartBar, IconFileText,
    IconChevronDown, IconShield
} from '@tabler/icons-react'
import './Header.css'

export default function Header() {
    const location = useLocation()
    const [toolsOpened, setToolsOpened] = useState(false)
    const [resourcesOpened, setResourcesOpened] = useState(false)

    const isActive = (path) => location.pathname === path

    return (
        <header className="mantine-header">
            <div className="header-content">
                <Link to="/" className="brand">
                    <span className="brand-icon animate-float">🛡️</span>
                    <span className="brand-text">PhishGuard</span>
                </Link>

                <nav className="main-nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') || isActive('/detection') ? 'active' : ''}`}
                    >
                        <IconHome size={20} />
                        <span>Home</span>
                    </Link>

                    {/* Tools Dropdown */}
                    <Menu
                        opened={toolsOpened}
                        onChange={setToolsOpened}
                        position="bottom-start"
                        offset={8}
                    >
                        <Menu.Target>
                            <button className="nav-link dropdown-trigger">
                                <IconSearch size={20} />
                                <span>Tools</span>
                                <IconChevronDown size={16} className={toolsOpened ? 'rotate' : ''} />
                            </button>
                        </Menu.Target>
                        <Menu.Dropdown className="dropdown-menu">
                            <Menu.Item
                                component={Link}
                                to="/detection"
                                leftSection={<IconFileText size={18} />}
                            >
                                <div>
                                    <div className="item-title">Text/URL Scanner</div>
                                    <div className="item-desc">Analyze emails and messages</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                component={Link}
                                to="/detection"
                                leftSection={<IconPhoto size={18} />}
                            >
                                <div>
                                    <div className="item-title">Image Analyzer</div>
                                    <div className="item-desc">Scan screenshots for threats</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                component={Link}
                                to="/url-checker"
                                leftSection={<IconLink size={18} />}
                            >
                                <div>
                                    <div className="item-title">URL Safety Check</div>
                                    <div className="item-desc">Verify link legitimacy</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                component={Link}
                                to="/email-analyzer"
                                leftSection={<IconMail size={18} />}
                            >
                                <div>
                                    <div className="item-title">Email Header Analyzer</div>
                                    <div className="item-desc">Validate email authenticity</div>
                                </div>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Resources Dropdown */}
                    <Menu
                        opened={resourcesOpened}
                        onChange={setResourcesOpened}
                        position="bottom-start"
                        offset={8}
                    >
                        <Menu.Target>
                            <button className="nav-link dropdown-trigger">
                                <IconBook size={20} />
                                <span>Resources</span>
                                <IconChevronDown size={16} className={resourcesOpened ? 'rotate' : ''} />
                            </button>
                        </Menu.Target>
                        <Menu.Dropdown className="dropdown-menu">
                            <Menu.Item
                                component={Link}
                                to="/awareness"
                                leftSection={<IconSchool size={18} />}
                            >
                                <div>
                                    <div className="item-title">Awareness Gallery</div>
                                    <div className="item-desc">Visual phishing examples</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                component={Link}
                                to="/learning"
                                leftSection={<IconBook size={18} />}
                            >
                                <div>
                                    <div className="item-title">Learning Center</div>
                                    <div className="item-desc">Tutorials and guides</div>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                component={Link}
                                to="/quiz"
                                leftSection={<IconTarget size={18} />}
                            >
                                <div>
                                    <div className="item-title">Phishing Quiz</div>
                                    <div className="item-desc">Test your knowledge</div>
                                </div>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <Link
                        to="/dashboard"
                        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                    >
                        <IconChartBar size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/report"
                        className={`nav-link ${isActive('/report') ? 'active' : ''}`}
                    >
                        <IconFileText size={20} />
                        <span>Report</span>
                    </Link>
                </nav>

                <Button
                    className="cta-button"
                >
                    Get Protected
                </Button>
            </div>
        </header>
    )
}
