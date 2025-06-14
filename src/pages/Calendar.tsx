
import React, { useState } from 'react';
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const sampleEvents = [
    { date: 5, title: "Team Meeting", time: "10:00 AM", color: "bg-blue-600" },
    { date: 12, title: "Project Deadline", time: "All Day", color: "bg-red-600" },
    { date: 18, title: "Client Call", time: "2:00 PM", color: "bg-green-600" },
    { date: 25, title: "Workshop", time: "9:00 AM", color: "bg-purple-600" },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Calendar</h1>
            <p className="text-gray-400 mt-1">Manage your schedule and events</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="border-gray-700 bg-gray-800 hover:bg-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="border-gray-700 bg-gray-800 hover:bg-gray-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-3 text-center text-gray-400 font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the first day of the month */}
                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={i} className="p-3 h-24"></div>
                  ))}
                  
                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dayEvents = sampleEvents.filter(event => event.date === day);
                    
                    return (
                      <div
                        key={day}
                        className={`p-2 h-24 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                          isToday(day) ? 'bg-blue-900 border-blue-600' : 'bg-gray-900'
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday(day) ? 'text-blue-300' : 'text-white'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.map((event, idx) => (
                            <div
                              key={idx}
                              className={`text-xs p-1 rounded text-white ${event.color}`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Events</CardTitle>
                <CardDescription className="text-gray-400">
                  Your scheduled events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleEvents.map((event, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{event.title}</h3>
                        <p className="text-gray-400 text-xs">
                          {monthNames[currentDate.getMonth()]} {event.date}, {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-gray-700 bg-gray-800 hover:bg-gray-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700 bg-gray-800 hover:bg-gray-700">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Calendar;
