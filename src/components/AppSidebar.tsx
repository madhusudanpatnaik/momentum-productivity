
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Truck, 
  BarChart3, 
  Settings,
  Target,
  Calendar,
  DollarSign,
  Heart,
  FolderKanban
} from 'lucide-react';

const menuItems = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Goals", url: "/app/goals", icon: Target },
  { title: "Projects", url: "/app/projects", icon: FolderKanban },
  { title: "Investment", url: "/app/investment", icon: DollarSign },
  { title: "Personal", url: "/app/personal", icon: Heart },
  { title: "Customers", url: "/app/customers", icon: Users },
  { title: "Orders", url: "/app/orders", icon: Package },
  { title: "Delivery", url: "/app/delivery", icon: Truck },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Calendar", url: "/app/calendar", icon: Calendar },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/app") {
      return currentPath === "/app";
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-gray-900 border-gray-800`}>
      <SidebarContent className="bg-gray-900">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">S</span>
            </div>
            {!isCollapsed && (
              <span className="text-white font-semibold text-lg">Synthezy</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/app"}
                      className={({ isActive: navIsActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive(item.url) || navIsActive
                            ? 'bg-white text-gray-900 font-medium' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
