// resources/js/Pages/Admin/Panel.jsx
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition, listContainer, listItem } from '@/config/animations';
import AppLayout from '@/Components/AppLayout';
import Card from '@/Components/Card';
import {
    UsersIcon,
    RocketLaunchIcon,
    CalendarDaysIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function AdminPanel() {
    const { t } = useTranslation();
    const { stats = {}, users = [], activity = [] } = usePage().props;

    const statCards = [
        {
            label: t('admin.totalUsers'),
            value: stats.totalUsers ?? 0,
            icon: UsersIcon,
        },
        {
            label: t('admin.activeChallenges'),
            value: stats.activeChallenges ?? 0,
            icon: RocketLaunchIcon,
        },
        {
            label: t('admin.activeEvents'),
            value: stats.activeEvents ?? 0,
            icon: CalendarDaysIcon,
        },
    ];

    const getRoleBadge = (role) => {
        const map = {
            student: 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400',
            professor: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400',
            admin: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400',
            other: 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400',
        };
        return map[role] || map.other;
    };

    return (
        <AppLayout>
            <Head title={t('admin.title')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="py-8 lg:py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {t('admin.title')}
                        </h1>
                    </div>

                    {/* Stats grid */}
                    <motion.div
                        variants={listContainer}
                        initial="hidden"
                        animate="show"
                        className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-10"
                    >
                        {statCards.map((stat) => (
                            <motion.div key={stat.label} variants={listItem}>
                                <Card className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex-shrink-0">
                                        <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            {stat.label}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Users table */}
                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden p-0">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {t('admin.usersTable.title')}
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-slate-700">
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                                                    {t('admin.usersTable.name')}
                                                </th>
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3 hidden sm:table-cell">
                                                    {t('admin.usersTable.email')}
                                                </th>
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3">
                                                    {t('admin.usersTable.role')}
                                                </th>
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-6 py-3 hidden md:table-cell">
                                                    {t('admin.usersTable.date')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                            {users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <td className="px-6 py-3.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                                                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                                                    {user.name?.charAt(0)?.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                {user.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3.5 hidden sm:table-cell">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <span
                                                            className={`inline-flex items-center text-xs font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${getRoleBadge(user.role)}`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3.5 hidden md:table-cell">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(user.created_at).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {users.length === 0 && (
                                        <div className="text-center py-12 px-6">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {t('common.noResults')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Activity overview */}
                        <div>
                            <Card>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                                    {t('admin.activity')}
                                </h2>
                                <div className="space-y-4">
                                    {/* Activity stat bars */}
                                    {[
                                        { label: t('admin.totalUsers'), value: stats.totalUsers ?? 0, max: 100, color: 'bg-indigo-500' },
                                        { label: t('admin.activeChallenges'), value: stats.activeChallenges ?? 0, max: 50, color: 'bg-green-500' },
                                        { label: t('admin.activeEvents'), value: stats.activeEvents ?? 0, max: 30, color: 'bg-amber-500' },
                                    ].map((item) => {
                                        const percent = item.max > 0 ? Math.min((item.value / item.max) * 100, 100) : 0;
                                        return (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between text-sm mb-1.5">
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                        {item.label}
                                                    </span>
                                                    <span className="text-gray-900 dark:text-white font-semibold">
                                                        {item.value}
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${item.color} rounded-full transition-all duration-700`}
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
