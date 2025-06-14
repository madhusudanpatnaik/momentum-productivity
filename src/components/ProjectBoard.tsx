import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, List, LayoutGrid, Filter } from 'lucide-react';
import AddItemModal from './AddItemModal';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  project: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

const ProjectBoard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [projects] = useState<Project[]>([
    { id: '1', name: 'MVP Development', color: 'bg-blue-500', taskCount: 12 },
    { id: '2', name: 'Marketing Site', color: 'bg-green-500', taskCount: 8 },
    { id: '3', name: 'User Research', color: 'bg-purple-500', taskCount: 5 }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design user authentication flow',
      description: 'Create wireframes and mockups for login/signup',
      status: 'todo',
      priority: 'high',
      project: 'MVP Development',
      dueDate: '2024-06-20'
    },
    {
      id: '2',
      title: 'Implement payment gateway',
      description: 'Integrate Stripe for subscription payments',
      status: 'in-progress',
      priority: 'high',
      project: 'MVP Development'
    },
    {
      id: '3',
      title: 'Write landing page copy',
      description: 'Create compelling headlines and CTAs',
      status: 'review',
      priority: 'medium',
      project: 'Marketing Site'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'review': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'done': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const handleAddTask = (newTask: any) => {
    setTasks(prev => [...prev, {
      ...newTask,
      status: 'todo' as const,
      priority: 'medium' as const,
      project: projects[0]?.name || 'General'
    }]);
  };

  const taskFields = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter task title...' },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter task description...' },
    { name: 'dueDate', label: 'Due Date', type: 'date' }
  ];

  const renderKanbanBoard = () => {
    const columns = [
      { id: 'todo', title: 'To Do', tasks: tasks.filter(t => t.status === 'todo') },
      { id: 'in-progress', title: 'In Progress', tasks: tasks.filter(t => t.status === 'in-progress') },
      { id: 'review', title: 'Review', tasks: tasks.filter(t => t.status === 'review') },
      { id: 'done', title: 'Done', tasks: tasks.filter(t => t.status === 'done') }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <Badge className="bg-gray-800 text-gray-300">{column.tasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <h4 className="text-white font-medium mb-2">{task.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      {task.dueDate && (
                        <span className="text-xs text-gray-400">{task.dueDate}</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                        {task.project}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Project Board</h1>
        <Button 
          className="bg-white text-gray-900 hover:bg-gray-100"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={viewMode === 'kanban' ? 'bg-white text-gray-900' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white text-gray-900' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-white text-gray-900' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="all">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${project.color}`} />
                <div>
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <p className="text-gray-400 text-sm">{project.taskCount} tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Board Content */}
      {viewMode === 'kanban' && renderKanbanBoard()}
      {viewMode === 'list' && (
        <div className="text-center py-12">
          <p className="text-gray-400">List view coming soon...</p>
        </div>
      )}
      {viewMode === 'calendar' && (
        <div className="text-center py-12">
          <p className="text-gray-400">Calendar view coming soon...</p>
        </div>
      )}

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Task"
        onAdd={handleAddTask}
        fields={taskFields}
      />
    </div>
  );
};

export default ProjectBoard;
