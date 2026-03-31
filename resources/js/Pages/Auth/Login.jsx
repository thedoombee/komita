// resources/js/Pages/Auth/Login.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function Login({ status, canResetPassword }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.login.title')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
            >
                {/* Background gradient shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-gradient-radial from-violet-500/10 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Komita
                                </span>
                            </Link>
                            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('auth.login.title')}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {t('auth.login.subtitle')}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm text-green-600 dark:text-green-400 text-center">
                                {status}
                            </div>
                        )}

                        <div className="space-y-5" onSubmit={submit}>
                            <Input
                                id="email"
                                type="email"
                                label={t('auth.login.email')}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                autoComplete="username"
                            />

                            <Input
                                id="password"
                                type="password"
                                label={t('auth.login.password')}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                autoComplete="current-password"
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {t('auth.login.remember')}
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                                    >
                                        {t('auth.login.forgot')}
                                    </Link>
                                )}
                            </div>

                            <Button
                                variant="primary"
                                size="md"
                                loading={processing}
                                disabled={processing}
                                onClick={submit}
                                className="w-full"
                            >
                                {t('auth.login.submit')}
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            {t('auth.login.noAccount')}{' '}
                            <Link
                                href={route('register')}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium transition-colors"
                            >
                                {t('auth.login.register')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </GuestLayout>
    );
}
