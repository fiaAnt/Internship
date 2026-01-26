export interface ElButtonProps extends Partial<Omit<HTMLButtonElement, 'disabled' | 'className' | 'children'>> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}
