import { ButtonProps } from '@chakra-ui/react';


export interface ElButtonProps extends Partial<Omit<ButtonProps, 'children'>> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: () => void;
}