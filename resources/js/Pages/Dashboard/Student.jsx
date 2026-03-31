// resources/js/Pages/Dashboard/Student.jsx
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition, listContainer, listItem } from '@/config/animations';
import AppLayout from '@/Components/AppLayout';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import {
    RocketLaunchIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    PlusIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function StudentDashboard() {
    const { t } = useTranslation();
    const { auth, challenges = [], stats = {} } = usePage().props;
    const user = auth.user;

    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const statCards = [
        {
            label: t('dashboard.student.activeChallenges'),
            value: stats.activeChallenges ?? 0,
            icon: RocketLaunchIcon,
        },
        {
            label: t('dashboard.student.validatedDays'),
            value: stats.validatedDays ?? 0,
            icon: CalendarDaysIcon,
        },
        {
            label: t('dashboard.student.successRate'),
            value: `${stats.successRate ?? 0}%`,
            icon: ChartBarIcon,
        },
    ];

    const getStatusBadge = (status) => {
        const map = {
            active: 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400',
            completed: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400',
            failed: 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400',
        };
        return map[status] || map.active;
    };

    const getStatusLabel = (status) => {
        const map = {
            active: t('challenge.status.active'),
            completed: t('challenge.status.completed'),
            failed: t('challenge.status.failed'),
        };
        return map[status] || map.active;
    };

    return (
        <AppLayout>
            <Head title={t('nav.dashboard')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="py-8 lg:py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Greeting */}
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {t('dashboard.greeting', { name: user.name })}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {t('dashboard.date', { date: dateStr })}
                        </p>
                    </div>

                    {/* Stats row */}
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

                    {/* My challenges section */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {t('dashboard.student.myChallenges')}
                        </h2>
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
                        >
                            <PlusIcon className="h-4 w-4" />
                            {t('challenge.create.title')}
                        </Link>
                    </div>

                    {challenges.length > 0 ? (
                        <motion.div
                            variants={listContainer}
                            initial="hidden"
                            animate="show"
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {challenges.map((challenge) => {
                                const progress = challenge.duration > 0
                                    ? Math.round((challenge.validated_days / challenge.duration) * 100)
                                    : 0;

                                return (
                                    <motion.div key={challenge.id} variants={listItem}>
                                        <Card hover className="flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                                                    {challenge.title}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center text-xs font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex-shrink-0 ml-3 ${getStatusBadge(challenge.status)}`}
                                                >
                                                    {getStatusLabel(challenge.status)}
                                                </span>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                                                    <span>
                                                        {t('dashboard.student.progress', {
                                                            current: challenge.validated_days,
                                                            total: challenge.duration,
                                                        })}
                                                    </span>
                                                    <span>{progress}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                >
                                                    <DocumentTextIcon className="h-4 w-4" />
                                                    {t('dashboard.student.submitReport')}
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        /* Empty state */
                        <Card className="text-center py-16">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 mx-auto mb-5">
                                <RocketLaunchIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('dashboard.student.empty.title')}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                                {t('dashboard.student.empty.subtitle')}
                            </p>
                            <Button variant="primary" size="md">
                                <PlusIcon className="h-4 w-4" />
                                {t('dashboard.student.empty.cta')}
                            </Button>
                        </Card>
                    )}
                </div>
            </motion.div>
        </AppLayout>
    );
}
