// resources/js/Pages/Dashboard/Professor.jsx
import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { pageTransition, listContainer, listItem } from '@/config/animations';
import AppLayout from '@/Components/AppLayout';
import Card from '@/Components/Card';
import Button from '@/Components/Button';
import {
    CalendarDaysIcon,
    DocumentTextIcon,
    PlusIcon,
    ClipboardDocumentIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';

export default function ProfessorDashboard() {
    const { t } = useTranslation();
    const { auth, events = [], stats = {} } = usePage().props;
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
            label: t('dashboard.professor.activeEvents'),
            value: stats.activeEvents ?? 0,
            icon: CalendarDaysIcon,
        },
        {
            label: t('dashboard.professor.totalSubmissions'),
            value: stats.totalSubmissions ?? 0,
            icon: DocumentTextIcon,
        },
    ];

    const copyLink = (code) => {
        const url = `${window.location.origin}/events/${code}`;
        navigator.clipboard.writeText(url).then(() => {
            toast.success(t('dashboard.professor.linkCopied'));
        });
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('dashboard.greeting', { name: user.name })}
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {t('dashboard.date', { date: dateStr })}
                            </p>
                        </div>
                        <Link
                            href={route('events.create')}
                            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 self-start"
                        >
                            <PlusIcon className="h-4 w-4" />
                            {t('dashboard.professor.createEvent')}
                        </Link>
                    </div>

                    {/* Stats row */}
                    <motion.div
                        variants={listContainer}
                        initial="hidden"
                        animate="show"
                        className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-10"
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

                    {/* My events section */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('dashboard.professor.myEvents')}
                    </h2>

                    {events.length > 0 ? (
                        <motion.div
                            variants={listContainer}
                            initial="hidden"
                            animate="show"
                            className="space-y-4"
                        >
                            {events.map((event) => (
                                <motion.div key={event.id} variants={listItem}>
                                    <Card className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                                {event.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {t('dashboard.professor.deadline', {
                                                        date: new Date(event.deadline).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }),
                                                    })}
                                                </span>
                                                <span className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-full">
                                                    {t('dashboard.professor.submissions', {
                                                        count: event.submissions_count ?? 0,
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyLink(event.code)}
                                            >
                                                <ClipboardDocumentIcon className="h-4 w-4" />
                                                {t('dashboard.professor.copyLink')}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.visit(route('events.show', event.code))}
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                                {t('dashboard.professor.viewSubmissions')}
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <Card className="text-center py-16">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 mx-auto mb-5">
                                <CalendarDaysIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('dashboard.professor.empty.title')}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                                {t('dashboard.professor.empty.subtitle')}
                            </p>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() => router.visit(route('events.create'))}
                            >
                                <PlusIcon className="h-4 w-4" />
                                {t('dashboard.professor.createEvent')}
                            </Button>
                        </Card>
                    )}
                </div>
            </motion.div>
        </AppLayout>
    );
}
