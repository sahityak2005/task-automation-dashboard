import { useEffect, useState } from 'react';

function TaskList({ tasks, onRunTask }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading tasks...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Task Name</th>
            <th className="p-3 text-left text-sm font-semibold">Status</th>
            <th className="p-3 text-left text-sm font-semibold">Last Run</th>
            <th className="p-3 text-left text-sm font-semibold">Triggered By</th>
            <th className="p-3 text-left text-sm font-semibold">Description</th>
            <th className="p-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm">{task.name}</td>
              <td className="p-3 text-sm">
                <span className={"px-2 py-1 rounded-full text-xs font-medium " + getStatusBadge(task.status)}>
                  {task.status}
                </span>
              </td>
              <td className="p-3 text-sm">
                {task.lastRunTime ? new Date(task.lastRunTime).toLocaleString() : 'N/A'}
              </td>
              <td className="p-3 text-sm">{task.triggeredBy}</td>
              <td className="p-3 text-sm">{task.description}</td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => onRunTask(task.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  disabled={task.status === 'Running'}
                >
                  Run Now
                </button>
                <button
                  onClick={() => alert(`Viewing logs for ${task.name}`)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  View Logs
                </button>
                <button
                  onClick={() => alert(`Editing configuration for ${task.name}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit Config
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
