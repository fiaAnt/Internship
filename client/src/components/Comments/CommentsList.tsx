import React from 'react';
import { Stack, Text, Spinner, Center } from '@chakra-ui/react';
import CommentItem from './CommentItem';
import { Comment } from 'types/comment';

interface Props {
  comments: Comment[];
  isLoading: boolean;
  isPosting?: boolean;
  onDelete: (id: string) => void;
}

const CommentsList: React.FC<Props> = ({
  comments,
  isLoading,
  isPosting,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (comments.length === 0) {
    return (
      <Center py={10}>
        <Text color="gray.500">Пока нет комментариев. Будьте первым!</Text>
      </Center>
    );
  }

  return (
    <Stack spacing={4}>
      {isPosting && (
        <Center py={2}>
          <Text color="blue.500">Отправка комментария...</Text>
        </Center>
      )}

      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onDelete={onDelete} />
      ))}
    </Stack>
  );
};

export default CommentsList;
