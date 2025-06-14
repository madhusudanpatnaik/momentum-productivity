
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
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  PieChart,
  Truck,
  ShoppingCart,
  Timer,
  Workflow
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export function ModernDashboard() {
  const [currentMode, setCurrentMode] = useState<'work' | 'personal'>('work');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'customers' | 'efficiency'>('revenue');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    price: '',
    payment: 'Online',
    priority: 'Medium' as 'Low' | 'Medium' | 'High'
  });

  const { 
    stats, 
    customers, 
    goals, 
    revenueData, 
    taskData, 
    goalProgress,
    workflowMetrics,
    activityLog,
    performanceData,
    updateCustomerStatus,
    addCustomer,
    updateGoalProgress,
    completeTask,
    exportData,
    getRecentActivity,
    getGoalsByCategory,
    getCustomersByStatus,
    updateDashboardMetrics
  } = useDashboardStore();

  const { showSuccess, showError } = useNotifications();

  // Auto-refresh dashboard metrics
  useEffect(() => {
    const interval = setInterval(() => {
      updateDashboardMetrics();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [updateDashboardMetrics]);

  const workflowStats = [
    { 
      title: "Workflow Efficiency", 
      value: `${workflowMetrics.efficiency.toFixed(1)}%`, 
      icon: Workflow, 
      color: "text-blue-400",
      trend: workflowMetrics.efficiency > 80 ? "up" : "down",
      description: `${workflowMetrics.completedTasks}/${workflowMetrics.totalTasks} tasks completed`
    },
    { 
      title: "Pending Orders", 
      value: stats.pendingOrders.toString(), 
      icon: Clock, 
      color: "text-orange-400",
      trend: stats.pendingOrders < 20 ? "up" : "down",
      description: "Awaiting processing"
    },
    { 
      title: "On Delivery", 
      value: stats.onDeliveryOrders.toString(), 
      icon: Truck, 
      color: "text-purple-400",
      trend: "neutral",
      description: "In transit"
    },
    { 
      title: "Completion Rate", 
      value: `${stats.completionRate.toFixed(1)}%`, 
      icon: CheckCircle, 
      color: "text-green-400",
      trend: stats.completionRate > 85 ? "up" : "down",
      description: "Overall success rate"
    }
  ];

  const realtimeMetrics = [
    { title: "Daily Target", current: stats.completedToday, target: stats.dailyTarget, color: "#10b981" },
    { title: "Monthly Target", current: stats.orders, target: stats.monthlyTarget, color: "#3b82f6" },
    { title: "Revenue Goal", current: stats.revenue, target: 30000, color: "#f59e0b" },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
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
    setNewCustomer({ name: '', address: '', price: '', payment: 'Online', priority: 'Medium' });
    setShowAddCustomer(false);
    showSuccess('Customer added successfully! Dashboard metrics updated.');
  };

  const handleStatusChange = (customerId: string, newStatus: 'Pending' | 'On Delivery' | 'Delivered') => {
    updateCustomerStatus(customerId, newStatus);
    showSuccess(`Status updated to ${newStatus}. Metrics automatically refreshed.`);
  };

  const handleGoalProgressUpdate = (goalId: string, increment: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      const newProgress = Math.min(goal.progress + increment, 100);
      updateGoalProgress(goalId, newProgress);
      
      if (newProgress === 100 && goal.progress < 100) {
        showSuccess('Goal completed! Dashboard updated with new achievements. 🎉');
      } else {
        showSuccess(`Progress updated to ${newProgress}%. Workflow metrics refreshed.`);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'On Delivery': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Delivered': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header with Real-time Indicators */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            Dashboard
            <div className="ml-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Live</span>
            </div>
          </h1>
          <p className="text-gray-400">Real-time workflow management and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Last Updated</p>
            <p className="text-white font-medium">{new Date().toLocaleTimeString()}</p>
          </div>
          <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />
        </div>
      </div>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {workflowStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400 mt-1" />}
                  {stat.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 mt-1 rotate-180" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Progress Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {realtimeMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current</span>
                  <span className="text-white font-medium">{metric.current.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(metric.current / metric.target) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Target: {metric.target.toLocaleString()}</span>
                  <span className="text-gray-400">
                    {((metric.current / metric.target) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section with Real-time Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Analytics */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="completed" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Workflow Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
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
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {goalProgress.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Feed */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {getRecentActivity().map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-xs">
                  {activity.type.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interactive Goals with Progress */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.filter(g => g.status === 'Active').map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{goal.title}</span>
                    <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/40 text-xs">
                      {goal.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">{goal.progress}%</span>
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
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Deadline: {goal.deadline}</span>
                  <span className="text-gray-400">{goal.target - (goal.progress * goal.target / 100)} remaining</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Customer Management Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Customer Workflow Management
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportData}
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
          
          {/* Enhanced Search and Filter */}
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
          </div>
        </CardHeader>
        
        {/* Enhanced Add Customer Form */}
        {showAddCustomer && (
          <CardContent className="border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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
              <Select value={newCustomer.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setNewCustomer({...newCustomer, priority: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Low">Low Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
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
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PRICE</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PAYMENT</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">STATUS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ASSIGNED</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 px-4 text-gray-300">{customer.id}</td>
                    <td className="py-4 px-4 text-white font-medium">{customer.name}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.address}</td>
                    <td className="py-4 px-4">
                      <Badge className={getPriorityColor(customer.priority)}>
                        {customer.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-white font-medium">{customer.price}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.payment}</td>
                    <td className="py-4 px-4">
                      <Select
                        value={customer.status}
                        onValueChange={(value: 'Pending' | 'On Delivery' | 'Delivered') => 
                          handleStatusChange(customer.id, value)
                        }
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-transparent border-none p-0">
                          <Badge className={getStatusColor(customer.status)}>
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
                    <td className="py-4 px-4 text-gray-300 text-sm">{customer.assignedTo || 'Unassigned'}</td>
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
