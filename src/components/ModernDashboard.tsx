
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';

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

export function ModernDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customers Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Customers</CardTitle>
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
    </div>
  );
}
