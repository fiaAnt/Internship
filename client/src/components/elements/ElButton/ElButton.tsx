import React from 'react';
import './elButton.css';
import { ElButtonProps } from './ElButton.types';
import ElText from '../ElText';

const ElButton: React.FC<ElButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
}) => {
  const classes = [
    'el-button',
    `el-button-${variant}`,
    `el-button-${size}`,
    className,
  ].join(' ');
  const textColor = variant === 'danger' ? 'secondary' : 'primary';

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <ElText as="span" variant="body" weight="bold" color={textColor}>
        {children}
      </ElText>
    </button>
  );
};

export default ElButton;
