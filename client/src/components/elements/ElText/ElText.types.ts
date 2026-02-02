import { TextProps as ChakraTextProps } from '@chakra-ui/react';


export type TextVariant =
    | 'title'
    | 'navigation'
    | 'subtitle'
    | 'body'
    | 'tag'
    | 'caption';
export type TextColor = 'primary' | 'secondary' | 'header' | 'accent' | 'danger';

export type TextWeight = 'regular' | 'medium' | 'bold';


interface ElTextProps extends ChakraTextProps {
    children: React.ReactNode;
    as?: React.ElementType;
    variant?: TextVariant;
    weight?: TextWeight;
    color?: TextColor;
}

export type { ElTextProps }