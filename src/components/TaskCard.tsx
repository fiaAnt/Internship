import React from 'react';
import type { Task } from '../generated/graphql';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'HIGH':
        return '#e23434ff';
      case 'MEDIUM':
        return '#e68b2bff';
      case 'LOW':
        return '#44b3abff';
      default:
        return '#ccc';
    }
  };

  if (!task) return null;

  return (
    <div className="task-card">
      <div
        className="task-priority-indicator"
        style={{ backgroundColor: getPriorityColor() }}
      />

      <div>
        <h2>{task.title ?? 'Без названия'}</h2>
        <h3>{task.description ?? ''}</h3>
        <div>
          <p>
            Создал: {task.creator?.firstname ?? ''}{' '}
            {task.creator?.lastname ?? ''}
          </p>
          {task.assignee && task.assignee.length > 0 && (
            <p>
              Назначено:{' '}
              {task.assignee
                .filter((a): a is NonNullable<typeof a> => a != null)
                .map((a) => `${a.firstname ?? ''} ${a.lastname ?? ''}`)
                .join(', ')}
            </p>
          )}
        </div>
      </div>

      {onEdit && (
        <div>
          <button
            className="settings-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            title="Редактировать задачу"
          >
            Настройки
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
