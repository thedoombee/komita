// resources/js/Pages/Events/Show.jsx
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import CountdownTimer from '@/Components/CountdownTimer';
import FileUpload from '@/Components/FileUpload';
import useCountdown from '@/hooks/useCountdown';
import {
    CalendarDaysIcon,
    ClockIcon,
    DocumentTextIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

export default function ShowEvent() {
    const { t } = useTranslation();
    const { auth, event = {} } = usePage().props;
    const user = auth?.user;

    const deadline = event.deadline || new Date().toISOString();
    const { isExpired } = useCountdown(deadline);

    const { data, setData, post, processing, errors } = useForm({
        content: '',
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isExpired || !user) return;
        post(route('dashboard'), {
            onSuccess: () => toast.success(t('success.submissionSent')),
        });
    };

    return (
        <GuestLayout>
            <Head title={event.title || t('nav.events')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="min-h-screen pt-24 pb-12"
            >
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Event info */}
                    <Card className="mb-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex-shrink-0">
                                <CalendarDaysIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {event.title}
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {t('event.show.deadline')}:
                                    </span>
                                    <CountdownTimer deadline={deadline} />
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {t('event.show.instructions')}
                            </h2>
                            <div className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {event.instructions}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Submission area */}
                    {isExpired ? (
                        /* Event closed */
                        <Card className="text-center py-12">
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 mx-auto mb-4">
                                <LockClosedIcon className="h-7 w-7 text-red-500 dark:text-red-400" />
                            </div>
                            <p className="text-base font-medium text-gray-900 dark:text-white mb-1">
                                {t('event.closed')}
                            </p>
                        </Card>
                    ) : !user ? (
                        /* Not authenticated */
                        <Card className="text-center py-12">
                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 mx-auto mb-4">
                                <LockClosedIcon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <p className="text-base font-medium text-gray-900 dark:text-white mb-1">
                                {t('event.show.loginRequired')}
                            </p>
                            <div className="mt-5">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200"
                                >
                                    {t('event.show.loginButton')}
                                </Link>
                            </div>
                        </Card>
                    ) : (
                        /* Submission form */
                        <Card>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                                {t('event.show.content')}
                            </h2>

                            <div className="space-y-6">
                                <Input
                                    id="content"
                                    type="textarea"
                                    placeholder={t('event.show.contentPlaceholder')}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    error={errors.content}
                                    className="min-h-[160px]"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        {t('event.show.file')}
                                    </label>
                                    <FileUpload
                                        onFileSelect={(file) => setData('file', file)}
                                        error={errors.file}
                                    />
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <Button
                                        variant="primary"
                                        size="md"
                                        loading={processing}
                                        disabled={processing}
                                        onClick={submit}
                                    >
                                        <DocumentTextIcon className="h-4 w-4" />
                                        {t('event.show.submit')}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </motion.div>
        </GuestLayout>
    );
}
