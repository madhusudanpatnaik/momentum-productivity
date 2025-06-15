
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  due_date?: string;
  labels: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  start_date: string;
  due_date: string;
  team_members: string[];
  color: string;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const [projectsResult, tasksResult] = await Promise.all([
        supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      if (projectsResult.error) throw projectsResult.error;
      if (tasksResult.error) throw tasksResult.error;

      setProjects(projectsResult.data || []);
      setTasks(tasksResult.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error fetching projects",
        description: "Failed to load your project data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => [data, ...prev]);
      toast({
        title: "Project created",
        description: "Your new project has been created successfully"
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error creating project",
        description: "Failed to create your project",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => prev.map(project => project.id === id ? data : project));
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error updating project",
        description: "Failed to update your project",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(prev => prev.filter(project => project.id !== id));
      setTasks(prev => prev.filter(task => task.project_id !== id));
      toast({
        title: "Project deleted",
        description: "Your project has been removed"
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: "Failed to delete your project",
        variant: "destructive"
      });
    }
  };

  const addTask = async (projectId: string, taskData: Omit<Task, 'id' | 'project_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, project_id: projectId, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => [data, ...prev]);
      toast({
        title: "Task created",
        description: "Your new task has been added"
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error creating task",
        description: "Failed to create your task",
        variant: "destructive"
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => prev.map(task => task.id === id ? data : task));
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error updating task",
        description: "Failed to update your task",
        variant: "destructive"
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
      toast({
        title: "Task deleted",
        description: "Your task has been removed"
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error deleting task",
        description: "Failed to delete your task",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return {
    projects,
    tasks,
    loading,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchProjects
  };
};
