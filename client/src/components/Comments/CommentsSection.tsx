import React, { useEffect } from 'react';
import { Stack, Textarea } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/store';
import {
  loadComments,
  createComment,
} from '@store/features/comments/comments.thunks';
import CommentsList from './CommentsList';
import ElButton from '@components/elements/ElButton';
import { CommentService } from '@api/services/comments';

interface Props {
  gameId: string;
  auth0Id: string;
  userName: string;
  userAvatar: string;
}

const CommentsSection: React.FC<Props> = ({
  gameId,
  auth0Id,
  userName,
  userAvatar,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = React.useState('');

  const { items: comments, loading } = useSelector(
    (state: RootState) => state.comment,
  );

  useEffect(() => {
    dispatch(loadComments(gameId));
  }, [gameId, dispatch]);

  const handleSubmit = () => {
    if (!text.trim() || !auth0Id) return;

    dispatch(
      createComment({
        gameId,
        text,
        auth0Id,
        userName: userName,
        userAvatar: userAvatar,
      }),
    );

    setText('');
  };

  const handleDeleteComment = async (id: string) => {
    if (!auth0Id) return;
    try {
      await CommentService.delete(id, auth0Id);
      dispatch(loadComments(gameId));
    } catch (err) {
      console.error('Ошибка удаления комментария', err);
    }
  };

  return (
    <Stack mx={16}>
      <Textarea
        h={40}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Написать комментарий"
      />
      <ElButton
        mb={10}
        alignSelf="flex-end"
        onClick={handleSubmit}
        isDisabled={!text.trim() || !auth0Id}
        color="primary"
      >
        Отправить
      </ElButton>
      <CommentsList
        comments={comments}
        isLoading={loading}
        onDelete={handleDeleteComment}
      />
    </Stack>
  );
};

export default CommentsSection;
