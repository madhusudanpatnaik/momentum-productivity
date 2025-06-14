
import React from 'react';
import { AppLayout } from "@/components/AppLayout";
import ProjectBoard from "@/components/ProjectBoard";

const ProjectsPage = () => {
  return (
    <AppLayout>
      <div className="h-full">
        <ProjectBoard />
      </div>
    </AppLayout>
  );
};

export default ProjectsPage;
