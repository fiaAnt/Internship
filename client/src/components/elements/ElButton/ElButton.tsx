import React from 'react';
import { Button } from '@chakra-ui/react';
import ElText from '../ElText';
import { ElButtonProps } from './ElButton.types';

const ElButton: React.FC<ElButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props
}) => {
  const bgColors: Record<string, string> = {
    primary: 'gray.200',
    secondary: 'blue.500',
    danger: 'red.500',
  };

  const hoverColors: Record<string, string> = {
    primary: 'gray.300',
    secondary: 'blue.600',
    danger: 'red.600',
  };

  const textColors: Record<string, string> = {
    primary: 'black',
    secondary: 'black',
    danger: 'white',
  };

  const padding: Record<string, string> = {
    small: '6px 12px',
    medium: '8px 16px',
    large: '14px 28px',
  };

  return (
    <Button
      onClick={onClick}
      bg={bgColors[variant]}
      color={textColors[variant]}
      px={padding[size].split(' ')[1]}
      py={padding[size].split(' ')[0]}
      borderRadius="14px"
      _hover={{ bg: hoverColors[variant] }}
      _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
      disabled={disabled}
      {...props}
    >
      <ElText
        as="span"
        variant="body"
        weight="bold"
        color={textColors[variant]}
      >
        {children}
      </ElText>
    </Button>
  );
};

export default ElButton;
