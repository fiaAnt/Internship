import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { UPDATE_TASK, DELETE_TASK, GET_TASKS, GET_USERS } from '../queries';
import '../style.css';
import type {
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
  UpdateTaskInput,
  Task,
  User,
  InputMaybe,
} from '../generated/graphql';
import { Status, Priority } from '../generated/graphql';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [form, setForm] = useState({
    title: task.title || '',
    description: task.description || '',
    status: task.status || Status.Planning,
    priority: task.priority || Priority.Low,
    assignee:
      task.assignee?.map((a) => a?.id).filter((id): id is string => !!id) || [],
    creator: task.creator?.id || '',
  });

  const { data: usersData } = useQuery<{ users: User[] }>(GET_USERS);
  const users = usersData?.users || [];

  const [updateTask, { loading: updating }] = useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UPDATE_TASK, {
    refetchQueries: [
      { query: GET_TASKS, variables: { projectId: task.project?.id } },
    ],
    onCompleted: () => {
      onUpdate();
      onClose();
    },
  });

  const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: GET_TASKS, variables: { projectId: task.project?.id } },
    ],
    onCompleted: () => {
      onDelete();
      onClose();
    },
  });

  const handleChange = (field: keyof typeof form, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!task.id) return;

    const input: UpdateTaskInput = {
      title: form.title,
      description: form.description.trim() || undefined,
      status: form.status,
      priority: form.priority,
      creator: form.creator || undefined,
      assignee:
        form.assignee.length > 0
          ? (form.assignee as InputMaybe<string>[])
          : undefined,
    };

    updateTask({
      variables: {
        id: task.id,
        input,
      },
    });
  };
  const handleDelete = () => {
    if (!task.id) return;
    if (confirm('Удалить эту задачу?')) {
      deleteTask({ variables: { id: task.id } });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактировать задачу</h2>

        <div>
          <label>Название</label>
          <input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Название задачи"
          />
        </div>

        <div>
          <label>Описание</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Описание задачи"
            rows={3}
          />
        </div>

        <div>
          <label>Статус</label>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value={Status.Planning}>Запланировано</option>
            <option value={Status.Active}>В работе</option>
            <option value={Status.Completed}>Завершено</option>
          </select>
        </div>

        <div>
          <label>Приоритет</label>
          <select
            value={form.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            <option value={Priority.Low}>Низкий</option>
            <option value={Priority.Medium}>Средний</option>
            <option value={Priority.High}>Высокий</option>
          </select>
        </div>

        <div>
          <label>Создатель</label>
          <select
            value={form.creator}
            onChange={(e) => handleChange('creator', e.target.value)}
          >
            <option value="">Выберите создателя</option>
            {users.map((user) => (
              <option key={user.id} value={user.id || ''}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Назначенные пользователи</label>
          <select
            value={form.assignee}
            onChange={(e) =>
              handleChange(
                'assignee',
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
          >
            {users.map((user) => (
              <option key={user.id} value={user.id || ''}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Удаление...' : 'Удалить задачу'}
          </button>

          <div>
            <button onClick={handleSave} disabled={updating}>
              {updating ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
