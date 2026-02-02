import React from 'react';
import { Text } from '@chakra-ui/react';
import {
  ElTextProps,
  TextColor,
  TextVariant,
  TextWeight,
} from './ElText.types';

const ElText: React.FC<ElTextProps> = ({
  children,
  as = 'p',
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  ...props
}) => {
  const fontSizes: Record<TextVariant, string> = {
    title: '2xl',
    navigation: 'xl',
    subtitle: 'lg',
    body: 'md',
    caption: 'sm',
    tag: 'xs',
  };

  const fontWeights: Record<TextWeight, number> = {
    regular: 400,
    medium: 500,
    bold: 700,
  };

  const colors: Record<TextColor, string> = {
    primary: 'black',
    secondary: 'white',
    header: 'white',
    accent: 'blue.400',
    danger: 'red.500',
  };

  return (
    <Text
      as={as}
      fontSize={fontSizes[variant]}
      fontWeight={fontWeights[weight]}
      color={colors[color]}
      lineHeight="1.4"
      fontFamily="'Inter Tight', system-ui, sans-serif"
      {...props}
    >
      {children}
    </Text>
  );
};

export default ElText;
