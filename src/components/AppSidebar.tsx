
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
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-slate-900 border-slate-700`}>
      <SidebarContent className="bg-slate-900">
        {/* Header/Logo Section */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            {!isCollapsed && (
              <span className="text-white font-semibold text-lg tracking-wide">Synthezy</span>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/app"}
                      className={({ isActive: navIsActive }) => {
                        const active = isActive(item.url) || navIsActive;
                        return `flex items-center space-x-3 px-3 py-3 mx-1 rounded-xl transition-all duration-200 group ${
                          active
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800 hover:scale-[1.01]'
                        }`;
                      }}
                    >
                      {({ isActive: navIsActive }) => {
                        const active = isActive(item.url) || navIsActive;
                        return (
                          <>
                            <item.icon 
                              className={`w-5 h-5 transition-colors ${
                                active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                              }`} 
                            />
                            {!isCollapsed && (
                              <span className={`font-medium text-sm transition-colors ${
                                active ? 'text-white' : 'text-slate-300 group-hover:text-white'
                              }`}>
                                {item.title}
                              </span>
                            )}
                          </>
                        );
                      }}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer section for collapsed state info */}
        {isCollapsed && (
          <div className="mt-auto p-4 border-t border-slate-700">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
