// resources/js/Pages/Auth/ResetPassword.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function ResetPassword({ token, email }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('profile.password.title')} />

            <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                transition={pageTransition.transition}
                className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-gradient-radial from-violet-500/10 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Komita</span>
                            </Link>
                            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('profile.password.title')}
                            </h1>
                        </div>

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

                            <Input
                                id="password"
                                type="password"
                                label={t('profile.password.new')}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                autoComplete="new-password"
                            />

                            <Input
                                id="password_confirmation"
                                type="password"
                                label={t('profile.password.confirm')}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                error={errors.password_confirmation}
                                autoComplete="new-password"
                            />

                            <Button variant="primary" size="md" loading={processing} disabled={processing} onClick={submit} className="w-full">
                                {t('profile.password.save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </GuestLayout>
    );
}
