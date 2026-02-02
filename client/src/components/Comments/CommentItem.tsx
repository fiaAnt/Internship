import React from 'react';
import { Box, Flex, Text, Avatar, IconButton } from '@chakra-ui/react';
import { Comment } from 'types/comment';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface Props {
  comment: Comment;
  onDelete: (id: string) => void;
}

const CommentItem: React.FC<Props> = ({ comment, onDelete }) => {
  const displayName = comment.userName || 'Пользователь';
  const displayAvatar = comment.userAvatar || '';
  const auth0Id = useSelector((state: RootState) => state.user.user?.sub);

  const isOwner = auth0Id === comment.auth0Id;

  return (
    <Flex
      align="flex-start"
      gap={3}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
    >
      {displayAvatar ? (
        <Avatar src={displayAvatar} name={displayName} size="sm" />
      ) : (
        <Avatar name={displayName} size="sm" bg="blue.500" color="white" />
      )}
      <Box flex="1">
        <Text fontWeight="bold" fontSize="sm">
          {displayName}
        </Text>
        <Text fontSize="md" mt={1}>
          {comment.text}
        </Text>
        <Text fontSize="xs" opacity={0.6} mt={2}>
          {new Date(comment.createdAt).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Box>
      {isOwner && (
        <IconButton
          aria-label="Удалить комментарий"
          icon={<DeleteIcon />}
          size="md"
          variant="ghost"
          colorScheme="red"
          onClick={() => onDelete(comment._id)}
        />
      )}
    </Flex>
  );
};

export default CommentItem;
