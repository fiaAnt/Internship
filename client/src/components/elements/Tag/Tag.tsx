import React from 'react';
import './tag.css';
import { TagProps } from './Tag.types';
import ElText from '../ElText/ElText';

const Tag: React.FC<TagProps> = ({ children, type = 'genre' }) => {
  return (
    <ElText as="span" variant="tag" weight="medium" className={`tag ${type}`}>
      {children}
    </ElText>
  );
};

export default Tag;
