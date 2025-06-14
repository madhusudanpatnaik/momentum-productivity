
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Calendar, List, Flag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new landing page',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-06-20',
          tags: ['design', 'frontend']
        },
        {
          id: '2',
          title: 'Set up analytics',
          description: 'Implement Google Analytics and tracking',
          priority: 'medium',
          tags: ['analytics', 'setup']
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Build user authentication',
          description: 'Implement login/signup functionality',
          priority: 'high',
          assignee: 'Jane Smith',
          dueDate: '2024-06-18',
          tags: ['backend', 'auth']
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'API documentation',
          description: 'Review and update API documentation',
          priority: 'low',
          assignee: 'Mike Johnson',
          tags: ['docs', 'api']
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Database setup',
          description: 'Set up PostgreSQL database',
          priority: 'high',
          tags: ['backend', 'database']
        }
      ]
    }
  ]);

  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>('kanban');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-white font-medium text-sm">{task.title}</h4>
            <Badge className={getPriorityColor(task.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          
          <p className="text-gray-400 text-xs">{task.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {task.assignee && (
            <div className="text-gray-400 text-xs">
              Assigned to: {task.assignee}
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-gray-400 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with view controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Project Boards</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 glass-morphism border-white/20 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              onClick={() => setViewMode('kanban')}
              className="text-white"
            >
              <Columns3 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="text-white"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setViewMode('calendar')}
              className="text-white"
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Kanban view */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <Card className="glass-morphism border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center justify-between">
                    {column.title}
                    <Badge className="bg-white/10 text-white">
                      {column.tasks.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {column.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white">All Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {columns.flatMap(col => col.tasks).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Calendar view placeholder */}
      {viewMode === 'calendar' && (
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Calendar View</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center text-gray-400">
              <Calendar className="w-16 h-16 mx-auto mb-4" />
              <p>Calendar view coming soon...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KanbanBoard;
