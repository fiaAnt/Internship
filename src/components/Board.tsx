import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_TASKS } from '../queries';
import type {
  GetTasksQuery,
  GetTasksQueryVariables,
  Task,
} from '../generated/graphql';
import { Status } from '../generated/graphql';
import TaskCard from './TaskCard';
import TaskCreateModal from './TaskCreateModel';
import TaskModal from './TaskModal';

interface BoardProps {
  projectId: string;
}

const Board: React.FC<BoardProps> = ({ projectId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { loading, error, data, refetch } = useQuery<
    GetTasksQuery,
    GetTasksQueryVariables
  >(GET_TASKS, {
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  if (loading && !data) return <div className="board">Загрузка доски...</div>;
  if (error) return <div className="board">Ошибка: {error.message}</div>;

  const columns: Record<Status, { title: string; tasks: Task[] }> = {
    [Status.Planning]: { title: 'Запланировано', tasks: [] },
    [Status.Active]: { title: 'В работе', tasks: [] },
    [Status.Completed]: { title: 'Завершено', tasks: [] },
  };

  const tasksList: Task[] = (data?.tasks ?? []).filter(
    (t): t is Task => t != null && t.id != null
  );

  tasksList.forEach((task) => {
    if (task.status) {
      columns[task.status].tasks.push(task);
    }
  });

  return (
    <div className="board">
      <div className="board-header">
        <h2>Доска проекта</h2>
        <button className="btn-create" onClick={() => setShowCreateModal(true)}>
          Создать задачу
        </button>
      </div>

      <div className="columns-container">
        {(
          Object.entries(columns) as [
            Status,
            { title: string; tasks: Task[] }
          ][]
        ).map(([status, { title, tasks }]) => (
          <div key={status} className="column">
            <h3>{title}</h3>
            <div className="tasks">
              {tasks.map((task) => (
                <TaskCard key={task.id!} task={task} onEdit={handleEditTask} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <TaskCreateModal
          projectId={projectId}
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            refetch();
            setShowCreateModal(false);
          }}
        />
      )}

      {editingTask && (
        <TaskModal
          task={editingTask}
          isOpen={true}
          onClose={() => setEditingTask(null)}
          onUpdate={() => refetch()}
          onDelete={() => refetch()}
        />
      )}
    </div>
  );
};

export default Board;
