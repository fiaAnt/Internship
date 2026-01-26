import React from 'react';
import './elText.css';
import { TextProps } from './ElText.types';

const ElText: React.FC<TextProps> = ({
  children,
  as: Component = 'p',
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className = '',
}) => {
  const classes = [
    'text',
    `text-${variant}`,
    `text-${weight}`,
    `text-${color}`,
    className,
  ].join(' ');

  return <Component className={classes}>{children}</Component>;
};

export default ElText;
