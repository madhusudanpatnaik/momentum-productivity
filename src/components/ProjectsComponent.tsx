
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectsStore } from "@/stores/projectsStore";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  FolderKanban, 
  Plus, 
  Calendar, 
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Check
} from 'lucide-react';

const ProjectsComponent = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'planning' as any,
    startDate: '',
    dueDate: '',
    teamMembers: [] as string[],
    color: '#3b82f6'
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo' as any,
    priority: 'medium' as any,
    assignee: '',
    dueDate: '',
    labels: [] as string[]
  });

  const {
    projects,
    teamMembers,
    addProject,
    updateProject,
    removeProject,
    addTask,
    updateTask,
    removeTask,
    moveTask
  } = useProjectsStore();

  const { showSuccess, showError } = useNotifications();

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.startDate || !newProject.dueDate) {
      showError('Please fill in all required fields');
      return;
    }

    addProject(newProject);

    setNewProject({
      title: '',
      description: '',
      status: 'planning',
      startDate: '',
      dueDate: '',
      teamMembers: [],
      color: '#3b82f6'
    });
    setShowAddProject(false);
    showSuccess('Project added successfully!');
  };

  const handleAddTask = (projectId: string) => {
    if (!newTask.title || !newTask.description) {
      showError('Please fill in task title and description');
      return;
    }

    addTask(projectId, newTask);

    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      labels: []
    });
    setShowAddTask(null);
    showSuccess('Task added successfully!');
  };

  const handleTaskStatusChange = (projectId: string, taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    moveTask(projectId, taskId, newStatus);
    
    const statusLabels = {
      'todo': 'moved to To Do',
      'in-progress': 'moved to In Progress', 
      'done': 'marked as Complete'
    };
    
    showSuccess(`Task ${statusLabels[newStatus]}!`);
  };

  const handleProjectStatusChange = (projectId: string, newStatus: 'planning' | 'active' | 'completed' | 'on-hold') => {
    updateProject(projectId, { status: newStatus });
    showSuccess(`Project status updated to ${newStatus}!`);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-500/20 text-gray-300';
      case 'active': return 'bg-blue-500/20 text-blue-300';
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'on-hold': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'todo': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your projects and track progress</p>
        </div>
        <Button
          onClick={() => setShowAddProject(true)}
          className="bg-white text-gray-900 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <FolderKanban className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Projects</p>
                <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'active').length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Completed</p>
                <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Team Members</p>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'planning', 'active', 'completed', 'on-hold'].map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterType)}
            className={filter === filterType ? "bg-white text-gray-900" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Project title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select value={newProject.status} onValueChange={(value: any) => setNewProject({...newProject, status: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="color"
                value={newProject.color}
                onChange={(e) => setNewProject({...newProject, color: e.target.value})}
                className="bg-gray-800 border-gray-700 h-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Start date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="date"
                placeholder="Due date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddProject} className="bg-white text-gray-900 hover:bg-gray-100">
                Add Project
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddProject(false)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: project.color }}
                  />
                  <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={project.status} 
                    onValueChange={(value: any) => handleProjectStatusChange(project.id, value)}
                  >
                    <SelectTrigger className="w-auto border-0 bg-transparent">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(project.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-1" />
                  {project.teamMembers.length} members
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Tasks ({project.tasks.length})</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddTask(project.id)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {project.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-800 rounded text-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const nextStatus = task.status === 'todo' ? 'in-progress' : 
                                             task.status === 'in-progress' ? 'done' : 'todo';
                            handleTaskStatusChange(project.id, task.id, nextStatus);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          {getTaskStatusIcon(task.status)}
                        </Button>
                        <span className={`${task.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                        <Select
                          value={task.status}
                          onValueChange={(value: any) => handleTaskStatusChange(project.id, task.id, value)}
                        >
                          <SelectTrigger className="w-auto h-6 text-xs border-0 bg-transparent">
                            <MoreHorizontal className="w-3 h-3" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTask(project.id, task.id)}
                          className="text-gray-400 hover:text-red-400 h-6 w-6"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {project.tasks.length > 3 && (
                    <p className="text-gray-400 text-xs text-center">
                      +{project.tasks.length - 3} more tasks
                    </p>
                  )}
                </div>

                {/* Add Task Form */}
                {showAddTask === project.id && (
                  <div className="space-y-2 p-3 bg-gray-800 rounded">
                    <Input
                      placeholder="Task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={newTask.assignee} onValueChange={(value) => setNewTask({...newTask, assignee: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Assignee" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {teamMembers.map((member) => (
                            <SelectItem key={member} value={member}>{member}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddTask(project.id)}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Add Task
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddTask(null)}
                        className="border-gray-600 text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsComponent;
