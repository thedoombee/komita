// resources/js/Pages/Auth/ConfirmPassword.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { pageTransition } from '@/config/animations';
import GuestLayout from '@/Components/GuestLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function ConfirmPassword() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
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
                <div className="relative w-full max-w-md">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-sm p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <Link href="/">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Komita</span>
                            </Link>
                            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {t('profile.password.title')}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {t('profile.password.subtitle')}
                            </p>
                        </div>

                        <div className="space-y-5">
                            <Input
                                id="password"
                                type="password"
                                label={t('auth.login.password')}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                autoComplete="current-password"
                            />

                            <Button variant="primary" size="md" loading={processing} disabled={processing} onClick={submit} className="w-full">
                                {t('auth.login.submit')}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </GuestLayout>
    );
}
