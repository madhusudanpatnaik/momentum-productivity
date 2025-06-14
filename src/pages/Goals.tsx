
import React from 'react';
import { AppLayout } from "@/components/AppLayout";
import GoalQuest from "@/components/GoalQuest";

const GoalsPage = () => {
  return (
    <AppLayout>
      <div className="h-full">
        <GoalQuest />
      </div>
    </AppLayout>
  );
};

export default GoalsPage;
