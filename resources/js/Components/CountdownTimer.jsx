// resources/js/Components/CountdownTimer.jsx
import { useTranslation } from 'react-i18next';
import useCountdown from '@/hooks/useCountdown';

export default function CountdownTimer({ deadline, className = '' }) {
    const { t } = useTranslation();
    const { hours, minutes, seconds, isExpired } = useCountdown(deadline);

    const totalHours = hours;
    let colorClass = 'text-green-600 dark:text-green-400';
    let pulseClass = '';

    if (isExpired) {
        colorClass = 'text-red-600 dark:text-red-400';
    } else if (totalHours < 1) {
        colorClass = 'text-red-600 dark:text-red-400';
        pulseClass = 'animate-pulse';
    } else if (totalHours < 4) {
        colorClass = 'text-amber-600 dark:text-amber-400';
    }

    const pad = (n) => String(n).padStart(2, '0');

    if (isExpired) {
        return (
            <div className={`${colorClass} ${className}`}>
                <p className="text-sm font-semibold">{t('challenge.expired')}</p>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-1.5 ${colorClass} ${pulseClass} ${className}`}>
            <div className="flex items-baseline gap-0.5 font-mono text-2xl font-bold tracking-tight">
                <span>{pad(hours)}</span>
                <span className="opacity-60">:</span>
                <span>{pad(minutes)}</span>
                <span className="opacity-60">:</span>
                <span>{pad(seconds)}</span>
            </div>
        </div>
    );
}
