
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
  BarChart3, 
  Settings,
  Target,
  Calendar,
  DollarSign,
  Heart,
  FolderKanban,
  TrendingUp,
  Users
} from 'lucide-react';

const menuItems = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard, color: "text-blue-400" },
  { title: "Goals", url: "/app/goals", icon: Target, color: "text-green-400" },
  { title: "Projects", url: "/app/projects", icon: FolderKanban, color: "text-purple-400" },
  { title: "Investment", url: "/app/investment", icon: DollarSign, color: "text-yellow-400" },
  { title: "Personal", url: "/app/personal", icon: Heart, color: "text-pink-400" },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3, color: "text-orange-400" },
  { title: "Calendar", url: "/app/calendar", icon: Calendar, color: "text-indigo-400" },
];

const bottomItems = [
  { title: "Settings", url: "/app/settings", icon: Settings, color: "text-slate-400" },
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
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl`}>
      <SidebarContent className="bg-transparent">
        {/* Header Section */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-white font-bold text-lg tracking-wide">Momentum</span>
                <div className="text-slate-400 text-xs font-medium">Productivity Suite</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-4 flex-1">
          <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {!isCollapsed && "Main Navigation"}
          </SidebarGroupLabel>
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
                        return `flex items-center space-x-3 px-3 py-3 mx-1 rounded-xl transition-all duration-200 group relative ${
                          active
                            ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white shadow-lg border border-blue-500/30' 
                            : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`;
                      }}
                    >
                      {({ isActive: navIsActive }) => {
                        const active = isActive(item.url) || navIsActive;
                        return (
                          <>
                            {active && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full"></div>
                            )}
                            <item.icon 
                              className={`w-5 h-5 transition-colors ${
                                active ? 'text-blue-400' : `${item.color} group-hover:text-white`
                              }`} 
                            />
                            {!isCollapsed && (
                              <span className={`font-medium text-sm transition-colors ${
                                active ? 'text-white' : 'text-slate-400 group-hover:text-white'
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

        {/* Bottom Navigation */}
        <SidebarGroup className="px-3 py-4 border-t border-slate-700/50 mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive: navIsActive }) => {
                        const active = isActive(item.url) || navIsActive;
                        return `flex items-center space-x-3 px-3 py-3 mx-1 rounded-xl transition-all duration-200 group ${
                          active
                            ? 'bg-gradient-to-r from-slate-600/30 to-slate-500/30 text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`;
                      }}
                    >
                      {({ isActive: navIsActive }) => {
                        const active = isActive(item.url) || navIsActive;
                        return (
                          <>
                            <item.icon 
                              className={`w-5 h-5 transition-colors ${
                                active ? 'text-white' : `${item.color} group-hover:text-white`
                              }`} 
                            />
                            {!isCollapsed && (
                              <span className={`font-medium text-sm transition-colors ${
                                active ? 'text-white' : 'text-slate-400 group-hover:text-white'
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

        {/* User Status */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">John Doe</div>
                <div className="text-slate-400 text-xs">Premium Member</div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
