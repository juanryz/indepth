export default function Button({ children, className = '', ...props }) {
    return (
        <button
            {...props}
            className={`
                inline-flex items-center justify-center px-6 py-3 border 
                text-base font-semibold rounded-md shadow-md
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export function PrimaryButton({ children, className = '', ...props }) {
    return (
        <Button
            {...props}
            className={`
                border-transparent text-white 
                bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary
                hover:from-brand-primary hover:via-brand-primary hover:to-brand-primary
                hover:shadow-lg hover:shadow-brand-primary/40
                focus:ring-brand-primary hover:-translate-y-0.5
                ${className}
            `}
        >
            {children}
        </Button>
    );
}

export function SecondaryButton({ children, className = '', ...props }) {
    return (
        <Button
            {...props}
            className={`
                border-brand-primary text-brand-primary dark:text-brand-primary
                bg-transparent hover:bg-brand-primary dark:hover:bg-brand-primary/20
                focus:ring-brand-primary hover:-translate-y-0.5
                ${className}
            `}
        >
            {children}
        </Button>
    );
}
