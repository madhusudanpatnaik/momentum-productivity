import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ModeToggle from "@/components/ModeToggle";
import FloatingActionButton from "@/components/FloatingActionButton";
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
  Trophy
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';

const statsCards = [
  {
    title: "Total Customers",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-blue-400"
  },
  {
    title: "Orders",
    value: "1,429",
    change: "+8%",
    icon: Package,
    color: "text-green-400"
  },
  {
    title: "Revenue",
    value: "$24,780",
    change: "+15%",
    icon: DollarSign,
    color: "text-yellow-400"
  },
  {
    title: "Growth",
    value: "18.2%",
    change: "+3%",
    icon: TrendingUp,
    color: "text-purple-400"
  }
];

const customerData = [
  {
    id: "1247",
    name: "Alice Smith",
    address: "448 Kutch Green Apt. 089",
    time: "10:15 AM",
    price: "$15.50",
    payment: "Online",
    date: "24/10/04",
    status: "Pending"
  },
  {
    id: "1248",
    name: "John Doe",
    address: "102 Suite, West Cliff Blvd. 512",
    time: "11:00 AM",
    price: "$13.50",
    payment: "Cash",
    date: "24/10/04",
    status: "On Delivery"
  },
  {
    id: "1249",
    name: "Maria Garcia",
    address: "302 Unit, Oceanview Dr.",
    time: "11:12 AM",
    price: "$17.00",
    payment: "Online",
    date: "24/10/04",
    status: "Delivered"
  }
];

const quickStats = [
  { title: "Active Goals", value: "8", icon: Target, color: "text-blue-400" },
  { title: "Completed Today", value: "3", icon: Trophy, color: "text-green-400" },
  { title: "Streak", value: "12 days", icon: Star, color: "text-yellow-400" },
  { title: "Total XP", value: "2,450", icon: Zap, color: "text-purple-400" }
];

const goalProgress = [
  { name: 'Completed', value: 65, color: '#10b981' },
  { name: 'In Progress', value: 25, color: '#3b82f6' },
  { name: 'Remaining', value: 10, color: '#6b7280' }
];

const revenueData = [
  { month: 'Jan', revenue: 12000, target: 15000 },
  { month: 'Feb', revenue: 18000, target: 15000 },
  { month: 'Mar', revenue: 14000, target: 15000 },
  { month: 'Apr', revenue: 22000, target: 15000 },
  { month: 'May', revenue: 24000, target: 15000 },
  { month: 'Jun', revenue: 28000, target: 15000 }
];

const taskCompletionData = [
  { day: 'Mon', completed: 8, total: 12 },
  { day: 'Tue', completed: 6, total: 10 },
  { day: 'Wed', completed: 9, total: 11 },
  { day: 'Thu', completed: 12, total: 15 },
  { day: 'Fri', completed: 7, total: 9 },
  { day: 'Sat', completed: 5, total: 6 },
  { day: 'Sun', completed: 3, total: 4 }
];

export function ModernDashboard() {
  const [currentMode, setCurrentMode] = useState<'work' | 'personal'>('work');

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your overview.</p>
        </div>
        <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
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
                <BarChart data={taskCompletionData}>
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

      {/* Progress Overview & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Monthly Revenue Goal</span>
                <span className="text-white">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Product Development</span>
                <span className="text-white">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Marketing Campaign</span>
                <span className="text-white">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">MVP Demo</p>
                <p className="text-gray-400 text-sm">Product Development</p>
              </div>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/40">
                2 days
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Marketing Campaign Launch</p>
                <p className="text-gray-400 text-sm">Marketing</p>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                1 week
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Quarterly Review</p>
                <p className="text-gray-400 text-sm">Business</p>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                3 weeks
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Recent Activity</CardTitle>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">NAME</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ADDRESS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">TIME</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PRICE</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">PAYMENT</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">DATE</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">STATUS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 px-4 text-gray-300">{customer.id}</td>
                    <td className="py-4 px-4 text-white font-medium">{customer.name}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.address}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.time}</td>
                    <td className="py-4 px-4 text-white font-medium">{customer.price}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.payment}</td>
                    <td className="py-4 px-4 text-gray-300">{customer.date}</td>
                    <td className="py-4 px-4">
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
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
