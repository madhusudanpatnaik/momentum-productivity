
import React from 'react';
import { AppLayout } from "@/components/AppLayout";
import InvestmentDashboard from "@/components/InvestmentDashboard";

const InvestmentPage = () => {
  return (
    <AppLayout>
      <div className="h-full">
        <InvestmentDashboard />
      </div>
    </AppLayout>
  );
};

export default InvestmentPage;
