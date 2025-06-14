
import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  labels: string[];
  createdDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  dueDate: string;
  teamMembers: string[];
  tasks: Task[];
  color: string;
}

interface ProjectsState {
  projects: Project[];
  teamMembers: string[];
  addProject: (project: Omit<Project, 'id' | 'tasks' | 'progress'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'createdDate'>) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  removeTask: (projectId: string, taskId: string) => void;
  moveTask: (projectId: string, taskId: string, newStatus: Task['status']) => void;
  calculateProgress: (projectId: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Build a modern e-commerce platform with React and Node.js',
      status: 'active',
      progress: 65,
      startDate: '2024-05-01',
      dueDate: '2024-08-15',
      teamMembers: ['Alice', 'Bob', 'Charlie'],
      color: '#3b82f6',
      tasks: [
        {
          id: '1',
          title: 'Design homepage layout',
          description: 'Create wireframes and design for the homepage',
          status: 'done',
          priority: 'high',
          assignee: 'Alice',
          dueDate: '2024-06-10',
          labels: ['design', 'ui'],
          createdDate: '2024-05-01'
        },
        {
          id: '2',
          title: 'Implement user authentication',
          description: 'Set up login/register functionality',
          status: 'in-progress',
          priority: 'high',
          assignee: 'Bob',
          dueDate: '2024-06-20',
          labels: ['backend', 'auth'],
          createdDate: '2024-05-05'
        },
        {
          id: '3',
          title: 'Create product catalog',
          description: 'Build product listing and search functionality',
          status: 'todo',
          priority: 'medium',
          assignee: 'Charlie',
          dueDate: '2024-07-01',
          labels: ['frontend', 'catalog'],
          createdDate: '2024-05-10'
        }
      ]
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile app using React Native',
      status: 'planning',
      progress: 20,
      startDate: '2024-06-01',
      dueDate: '2024-10-01',
      teamMembers: ['David', 'Eve'],
      color: '#10b981',
      tasks: [
        {
          id: '4',
          title: 'Research and planning',
          description: 'Define app requirements and technical stack',
          status: 'in-progress',
          priority: 'high',
          assignee: 'David',
          dueDate: '2024-06-15',
          labels: ['planning', 'research'],
          createdDate: '2024-06-01'
        }
      ]
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Personal portfolio website with modern design',
      status: 'completed',
      progress: 100,
      startDate: '2024-03-01',
      dueDate: '2024-04-15',
      teamMembers: ['Frank'],
      color: '#8b5cf6',
      tasks: [
        {
          id: '5',
          title: 'Design portfolio layout',
          description: 'Create responsive design for portfolio',
          status: 'done',
          priority: 'medium',
          assignee: 'Frank',
          dueDate: '2024-03-15',
          labels: ['design'],
          createdDate: '2024-03-01'
        },
        {
          id: '6',
          title: 'Deploy to production',
          description: 'Set up hosting and deploy website',
          status: 'done',
          priority: 'low',
          assignee: 'Frank',
          dueDate: '2024-04-10',
          labels: ['deployment'],
          createdDate: '2024-04-01'
        }
      ]
    }
  ],

  teamMembers: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],

  addProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      tasks: [],
      progress: 0
    };
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  },

  removeProject: (id) => {
    set((state) => ({
      projects: state.projects.filter(project => project.id !== id)
    }));
  },

  addTask: (projectId, taskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      )
    }));

    // Recalculate progress after adding task
    get().calculateProgress(projectId);
  },

  updateTask: (projectId, taskId, updates) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
              )
            }
          : project
      )
    }));

    // Recalculate progress after updating task
    get().calculateProgress(projectId);
  },

  removeTask: (projectId, taskId) => {
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter(task => task.id !== taskId)
            }
          : project
      )
    }));

    // Recalculate progress after removing task
    get().calculateProgress(projectId);
  },

  moveTask: (projectId, taskId, newStatus) => {
    get().updateTask(projectId, taskId, { status: newStatus });
  },

  calculateProgress: (projectId) => {
    const state = get();
    const project = state.projects.find(p => p.id === projectId);
    
    if (project && project.tasks.length > 0) {
      const completedTasks = project.tasks.filter(t => t.status === 'done').length;
      const totalTasks = project.tasks.length;
      const progress = Math.round((completedTasks / totalTasks) * 100);
      
      // Auto-complete project if all tasks are done
      const shouldComplete = progress === 100 && project.status !== 'completed';
      
      get().updateProject(projectId, { 
        progress,
        ...(shouldComplete && { status: 'completed' })
      });
    } else if (project && project.tasks.length === 0) {
      // Reset progress if no tasks
      get().updateProject(projectId, { progress: 0 });
    }
  }
}));
