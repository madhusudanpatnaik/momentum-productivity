
import React from 'react';
import { AppLayout } from "@/components/AppLayout";
import PersonalGoals from "@/components/PersonalGoals";

const PersonalPage = () => {
  return (
    <AppLayout>
      <div className="h-full">
        <PersonalGoals />
      </div>
    </AppLayout>
  );
};

export default PersonalPage;
