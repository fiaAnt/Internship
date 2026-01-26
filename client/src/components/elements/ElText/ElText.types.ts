type TextVariant = 'title' | 'navigation' | 'subtitle' | 'body' | 'tag' | 'caption';
type TextWeight = 'regular' | 'medium' | 'bold';
type TextColor = 'primary' | 'secondary' | 'header' | 'accent' | 'danger';

interface TextProps {
    children: React.ReactNode;
    as?: React.ElementType;
    variant?: TextVariant;
    weight?: TextWeight;
    color?: TextColor;
    className?: string;
}

export type { TextProps }