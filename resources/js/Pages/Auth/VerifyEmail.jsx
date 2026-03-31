// resources/js/Pages/Auth/VerifyEmail.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Button from '@/Components/Button';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function VerifyEmail({ status }) {
    const { t } = useTranslation();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.login.email')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
            >
                <div className="relative w-full max-w-md">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm p-8 lg:p-10 text-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 mx-auto mb-5">
                            <EnvelopeIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        </div>

                        <Link href="/">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Komita</span>
                        </Link>

                        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t('auth.login.subtitle')}
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium">
                                {t('success.profileUpdated')}
                            </div>
                        )}

                        <div className="mt-6 flex flex-col gap-3">
                            <Button variant="primary" size="md" loading={processing} disabled={processing} onClick={submit} className="w-full">
                                {t('common.save')}
                            </Button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                {t('nav.logout')}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </GuestLayout>
    );
}
