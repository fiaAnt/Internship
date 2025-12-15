import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_TASK, GET_TASKS, GET_USERS } from '../queries';
import '../style.css';
import type {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  TaskInput,
  User,
} from '../generated/graphql';
import { Status, Priority } from '../generated/graphql';

interface TaskCreateModalProps {
  projectId: string;
  onClose: () => void;
  onCreated: () => void;
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({
  projectId,
  onClose,
  onCreated,
}) => {
  const [formData, setFormData] = useState<Omit<TaskInput, 'project'>>({
    title: '',
    description: '',
    status: Status.Planning,
    priority: Priority.Low,
    assignee: [],
  });

  const [creator, setCreator] = useState<string>('');

  const { data: usersData } = useQuery<{ users: User[] }>(GET_USERS);

  const [createTask, { loading }] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
    onCompleted: (data) => {
      if (data.createTask) {
        onCreated();
        onClose();
      }
    },
    onError: (err) => {
      console.error('Failed to create task:', err);
      alert('Не удалось создать задачу');
    },
  });

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.status || !formData.priority) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const input: TaskInput = {
      ...formData,
      project: projectId,
      creator: creator || undefined,
    };

    createTask({ variables: { input } });
  };

  const users = usersData?.users || [];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Создать задачу</h2>

        <label>Название</label>
        <input
          type="text"
          value={formData.title ?? ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Введите название задачи"
        />

        <label>Описание</label>
        <textarea
          value={formData.description ?? ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Опишите задачу"
        />

        <label>Статус</label>
        <select
          value={formData.status ?? Status.Planning}
          onChange={(e) => handleChange('status', e.target.value as Status)}
        >
          <option value={Status.Planning}>Запланировано</option>
          <option value={Status.Active}>В работе</option>
          <option value={Status.Completed}>Завершено</option>
        </select>

        <label>Приоритет</label>
        <select
          value={formData.priority ?? Priority.Low}
          onChange={(e) => handleChange('priority', e.target.value as Priority)}
        >
          <option value={Priority.Low}>Низкий</option>
          <option value={Priority.Medium}>Средний</option>
          <option value={Priority.High}>Высокий</option>
        </select>

        <label>Создатель задачи</label>
        <select value={creator} onChange={(e) => setCreator(e.target.value)}>
          <option value="">Выберите создателя</option>
          {users.map((user) => (
            <option key={user.id} value={user.id || ''}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>

        <label>Назначенные пользователи</label>
        <select
          value={(formData.assignee || []).filter(
            (v): v is string => v != null
          )}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            handleChange('assignee', values);
          }}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id || ''}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>
            Отмена
          </button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Создание...' : 'Создать'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreateModal;
