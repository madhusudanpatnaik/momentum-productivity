
import { AppLayout } from "@/components/AppLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Target, DollarSign } from "lucide-react";
import { useState } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Project Alpha Review",
    date: "2025-06-15",
    time: "10:00 AM",
    type: "project",
    priority: "high"
  },
  {
    id: 2,
    title: "Investment Portfolio Check",
    date: "2025-06-16",
    time: "2:00 PM",
    type: "financial",
    priority: "medium"
  },
  {
    id: 3,
    title: "Quarterly Goal Review",
    date: "2025-06-18",
    time: "9:00 AM",
    type: "goal",
    priority: "high"
  },
  {
    id: 4,
    title: "Personal Development Session",
    date: "2025-06-20",
    time: "6:00 PM",
    type: "personal",
    priority: "low"
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case "project":
      return <Clock className="h-4 w-4" />;
    case "goal":
      return <Target className="h-4 w-4" />;
    case "financial":
      return <DollarSign className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "default";
  }
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and track important milestones.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Select a date to view events and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next deadlines and milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    <Badge variant={getPriorityColor(event.priority)} className="text-xs">
                      {event.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Events scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">2</div>
              <p className="text-xs text-muted-foreground">Tasks past deadline</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">15</div>
              <p className="text-xs text-muted-foreground">Events this month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
