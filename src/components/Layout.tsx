import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Shield,
    FileCode,
    Workflow,
    AlertTriangle,
    Moon,
    Sun,
    Settings as SettingsIcon,
    Users as UsersIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
    children: React.ReactNode;
}

const navigation = [
    { name: '대시보드', nameEn: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: '위험 사용자', nameEn: 'Risk Users', href: '/users', icon: UsersIcon },
    { name: '위협 탐지', nameEn: 'Threats', href: '/threats', icon: AlertTriangle },
    { name: '탐지 규칙', nameEn: 'Rules', href: '/rules', icon: FileCode },
    { name: '자동화', nameEn: 'Automation', href: '/automation', icon: Workflow },
    { name: '설정', nameEn: 'Settings', href: '/settings', icon: SettingsIcon },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-800 flex flex-col">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-dark-800">
                    <Shield className="w-8 h-8 text-enterprise-500" />
                    <div className="ml-3">
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">WOI On-Prem</div>
                        <div className="text-xs text-gray-500">Omnissa Intelligence</div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                                    isActive
                                        ? 'bg-enterprise-500/10 text-enterprise-600 dark:text-enterprise-400 border border-enterprise-500/20'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-gray-200'
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Dark Mode Toggle as Menu Item */}
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                        <div>
                            <div className="font-medium">{isDark ? '라이트 모드' : '다크 모드'}</div>
                        </div>
                    </button>
                </nav>

                {/* Footer Version Info */}
                <div className="p-4 border-t border-gray-200 dark:border-dark-800">
                    <div className="text-xs text-gray-500 text-center">
                        v1.0.0 | Air-Gapped Mode
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-dark-950 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <SearchBar />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        <NotificationBell />
                        <div className="w-px h-6 bg-gray-200 dark:bg-dark-800 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-enterprise-500 flex items-center justify-center text-white font-medium text-sm">
                                AD
                            </div>
                            <div className="hidden md:block">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">System Administrator</div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};
