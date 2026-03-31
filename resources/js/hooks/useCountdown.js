// resources/js/hooks/useCountdown.js
import { useState, useEffect, useCallback } from 'react';

export default function useCountdown(targetTime) {
    const getTarget = useCallback(() => {
        if (!targetTime) return null;
        if (targetTime instanceof Date) return targetTime;
        // If it looks like a time-only string (HH:MM or HH:MM:SS), build today's date
        if (/^\d{2}:\d{2}(:\d{2})?$/.test(targetTime)) {
            const now = new Date();
            const [h, m, s = 0] = targetTime.split(':').map(Number);
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
            // If time has already passed today, it means tomorrow
            if (target <= now) {
                target.setDate(target.getDate() + 1);
            }
            return target;
        }
        return new Date(targetTime);
    }, [targetTime]);

    const calcRemaining = useCallback(() => {
        const target = getTarget();
        if (!target) return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
        const diff = target.getTime() - Date.now();
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
        const totalSeconds = Math.floor(diff / 1000);
        return {
            hours: Math.floor(totalSeconds / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
            isExpired: false,
        };
    }, [getTarget]);

    const [remaining, setRemaining] = useState(calcRemaining);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(calcRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, [calcRemaining]);

    return remaining;
}
