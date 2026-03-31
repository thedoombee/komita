// resources/js/Components/Card.jsx
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.01 } : {}}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
                bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl
                border border-white/20 dark:border-slate-700/50 shadow-sm
                p-6 lg:p-8 ${className}
            `}
            {...props}
        >
            {children}
        </motion.div>
    );
}
