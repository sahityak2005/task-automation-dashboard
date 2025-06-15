import { useState } from 'react';
import TaskList from './components/TaskList';
import NewAutomationModal from './components/NewAutomationModal';
import dummyTasks from './data/dummyTasks';

function App() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRunTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: 'Running' } : task
      )
    );
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                status: 'Completed',
                lastRunTime: new Date().toISOString(),
              }
            : task
        )
      );
    }, 2000);
  };

  const handleAddAutomation = (newAutomation) => {
    const newTask = {
      id: tasks.length + 1,
      name: newAutomation.ruleName,
      status: 'Scheduled',
      lastRunTime: '',
      triggeredBy: newAutomation.triggerType,
      description: newAutomation.description,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Task Automation Dashboard</h1>
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Automated Tasks</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Automation
          </button>
        </div>

        <TaskList tasks={tasks} onRunTask={handleRunTask} />

        {isModalOpen && (
          <NewAutomationModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddAutomation}
          />
        )}
      </main>
    </div>
  );
}

export default App;
