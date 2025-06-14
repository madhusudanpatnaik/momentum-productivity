
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ModeToggle from "@/components/ModeToggle";
import FloatingActionButton from "@/components/FloatingActionButton";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Download,
  Filter,
  MoreHorizontal,
  Target,
  Calendar,
  Star,
  Zap,
  Trophy,
  Plus,
  Search,
  Edit,
  Workflow,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';

export function ModernDashboard() {
  const [currentMode, setCurrentMode] = useState<'work' | 'personal'>('work');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterWorkflow, setFilterWorkflow] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    price: '',
    payment: 'Online'
  });

  const { 
    stats, 
    customers, 
    goals, 
    workflowStages,
    revenueData, 
    taskData, 
    goalProgress,
    workflowData,
    updateCustomerStatus,
    updateCustomerWorkflow,
    addCustomer,
    updateGoalProgress,
    updateGoalWorkflow,
    completeTask,
    exportData,
    calculateWorkflowMetrics
  } = useDashboardStore();

  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    calculateWorkflowMetrics();
  }, [calculateWorkflowMetrics]);

  const quickStats = [
    { title: "Workflow Efficiency", value: `${stats.workflowEfficiency}%`, icon: Workflow, color: "text-blue-400" },
    { title: "Completed Today", value: stats.completedToday.toString(), icon: CheckCircle, color: "text-green-400" },
    { title: "Avg. Completion", value: `${stats.avgCompletionTime}d`, icon: Clock, color: "text-yellow-400" },
    { title: "Active Goals", value: stats.activeGoals.toString(), icon: Target, color: "text-purple-400" }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    const matchesWorkflow = filterWorkflow === 'all' || customer.workflowStage === filterWorkflow;
    return matchesSearch && matchesStatus && matchesWorkflow;
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.address || !newCustomer.price) {
      showError('Please fill in all required fields');
      return;
    }

    const customerData = {
      ...newCustomer,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '/'),
      status: 'Pending' as const
    };

    addCustomer(customerData);
    setNewCustomer({ name: '', address: '', price: '', payment: 'Online' });
    setShowAddCustomer(false);
    showSuccess('Customer added successfully!');
  };

  const handleStatusChange = (customerId: string, newStatus: 'Pending' | 'On Delivery' | 'Delivered') => {
    updateCustomerStatus(customerId, newStatus);
    showSuccess(`Status updated to ${newStatus}`);
  };

  const handleWorkflowChange = (customerId: string, newStage: 'Order Received' | 'Processing' | 'In Transit' | 'Completed') => {
    updateCustomerWorkflow(customerId, newStage);
    showSuccess(`Workflow updated to ${newStage}`);
  };

  const handleGoalWorkflowUpdate = (goalId: string, newStatus: 'Planning' | 'In Progress' | 'Review' | 'Completed') => {
    updateGoalWorkflow(goalId, newStatus);
    showSuccess(`Goal workflow updated to ${newStatus}`);
  };

  const handleGoalProgressUpdate = (goalId: string, increment: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      const newProgress = Math.min(goal.progress + increment, 100);
      updateGoalProgress(goalId, newProgress);
      
      if (newProgress === 100 && goal.progress < 100) {
        showSuccess('Goal completed! 🎉');
        handleGoalWorkflowUpdate(goalId, 'Completed');
        completeTask();
      } else {
        showSuccess(`Progress updated to ${newProgress}%`);
      }
    }
  };

  const handleExport = () => {
    try {
      exportData();
      showSuccess('Data exported successfully!');
    } catch (error) {
      showError('Failed to export data');
    }
  };

  const getWorkflowStageColor = (stage: string) => {
    const stageMap: Record<string, string> = {
      'Order Received': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      'Processing': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      'In Transit': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      'Completed': 'bg-green-500/20 text-green-300 border-green-500/40'
    };
    return stageMap[stage] || 'bg-gray-500/20 text-gray-300 border-gray-500/40';
  };

  const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      'High': 'bg-red-500/20 text-red-300 border-red-500/40',
      'Medium': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      'Low': 'bg-green-500/20 text-green-300 border-green-500/40'
    };
    return priorityMap[priority] || 'bg-gray-500/20 text-gray-300 border-gray-500/40';
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workflow Dashboard</h1>
          <p className="text-gray-400">Monitor and manage your workflow processes in real-time.</p>
        </div>
        <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Stages */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Workflow className="w-5 h-5 mr-2" />
              Workflow Stages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {workflowStages.map((stage) => (
              <div key={stage.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-white font-medium">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                    {stage.count} items
                  </Badge>
                  {stage.nextStage && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Workflow Efficiency Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Workflow Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workflowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="stage" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="efficiency" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Progress Donut Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={goalProgress}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {goalProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="target" stroke="#6b7280" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Completion Bar Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Weekly Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#374151" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Management with Workflow */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Goals Workflow Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-medium">{goal.title}</h3>
                  <p className="text-gray-400 text-sm">Due: {goal.dueDate} • Assignee: {goal.assignee}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={goal.workflowStatus}
                    onValueChange={(value: 'Planning' | 'In Progress' | 'Review' | 'Completed') => 
                      handleGoalWorkflowUpdate(goal.id, value)
                    }
                  >
                    <SelectTrigger className="w-32 h-8 text-xs bg-transparent border-none p-0">
                      <Badge className={
                        goal.workflowStatus === "Planning" 
                          ? "bg-gray-500/20 text-gray-300 border-gray-500/40" 
                          : goal.workflowStatus === "In Progress"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                          : goal.workflowStatus === "Review"
                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
                          : "bg-green-500/20 text-green-300 border-green-500/40"
                      }>
                        {goal.workflowStatus}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGoalProgressUpdate(goal.id, 10)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 h-6 px-2"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Customers Table with Workflow */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Customer Workflow Management</CardTitle>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAddCustomer(true)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="On Delivery">On Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterWorkflow} onValueChange={setFilterWorkflow}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <Workflow className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Workflow</SelectItem>
                <SelectItem value="Order Received">Order Received</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        {/* Add Customer Form */}
        {showAddCustomer && (
          <CardContent className="border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Customer name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Price (e.g., $15.50)"
                value={newCustomer.price}
                onChange={(e) => setNewCustomer({...newCustomer, price: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Select value={newCustomer.payment} onValueChange={(value) => setNewCustomer({...newCustomer, payment: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddCustomer} className="bg-white text-gray-900 hover:bg-gray-100">
                Add Customer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddCustomer(false)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">NAME</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ADDRESS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PRICE</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">STATUS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">WORKFLOW</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 px-4 text-gray-300">{customer.id}</td>
                    <td className="py-4 px-4 text-white font-medium">{customer.name}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.address}</td>
                    <td className="py-4 px-4 text-white font-medium">{customer.price}</td>
                    <td className="py-4 px-4">
                      <Badge className={getPriorityColor(customer.priority)}>
                        {customer.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Select
                        value={customer.status}
                        onValueChange={(value: 'Pending' | 'On Delivery' | 'Delivered') => 
                          handleStatusChange(customer.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-transparent border-none p-0">
                          <Badge 
                            className={
                              customer.status === "Pending" 
                                ? "bg-orange-500/20 text-orange-300 border-orange-500/40" 
                                : customer.status === "On Delivery"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                : "bg-green-500/20 text-green-300 border-green-500/40"
                            }
                          >
                            {customer.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="On Delivery">On Delivery</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <Select
                        value={customer.workflowStage}
                        onValueChange={(value: 'Order Received' | 'Processing' | 'In Transit' | 'Completed') => 
                          handleWorkflowChange(customer.id, value)
                        }
                      >
                        <SelectTrigger className="w-36 h-8 text-xs bg-transparent border-none p-0">
                          <Badge className={getWorkflowStageColor(customer.workflowStage)}>
                            {customer.workflowStage}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="Order Received">Order Received</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No customers found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
