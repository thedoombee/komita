// resources/js/Pages/Auth/ForgotPassword.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function ForgotPassword({ status }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.login.forgot')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Komita</span>
                            </Link>
                            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('auth.login.forgot')}
                            </h1>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm text-green-600 dark:text-green-400 text-center">{status}</div>
                        )}

                        <div className="space-y-5">
                            <Input
                                id="email"
                                type="email"
                                label={t('auth.login.email')}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                autoComplete="username"
                            />

                            <Button variant="primary" size="md" loading={processing} disabled={processing} onClick={submit} className="w-full">
                                {t('common.save')}
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            <Link href={route('login')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium transition-colors">
                                {t('auth.login.submit')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </GuestLayout>
    );
}
