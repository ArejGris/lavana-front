'use client'
import { useSession } from "next-auth/react";
import { Footer } from "../components/Footer/client";
import Sidebar from "../components/dashbord/partials/Sidebar";
import Header from "../components/dashbord/partials/Header";
import WelcomeBanner from "../components/dashbord/partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../components/dashbord/partials/dashboard/DashboardAvatars";
import Datepicker from "../components/dashbord/components/Datepicker";
import DashboardCard07 from "../components/dashbord/partials/dashboard/DashboardCard07";
import DashboardCard10 from "../components/dashbord/partials/dashboard/DashboardCard10";
import DashboardCard12 from "../components/dashbord/partials/dashboard/DashboardCard12";
import DashboardCard13 from "../components/dashbord/partials/dashboard/DashboardCard13";
import Banner from "../components/dashbord/partials/Banner";
import FilterButton from '../components/dashbord/components/DropdownFilter';
import { useState } from "react";

function Dashboard({params: {lng}}) {
  const { data: session } = useSession();

  return (
    
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
       
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
            
              {/* Line chart (Acme Advanced) */}
        
              {/* Line chart (Acme Professional) */}
            
              {/* Bar chart (Direct vs Indirect) */}
        
              {/* Line chart (Real Time Value) */}
         
              {/* Doughnut chart (Top Countries) */}
             
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
            
              {/* Stacked bar chart (Sales VS Refunds) */}
              
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
           
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 lng={lng}/>
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
      
  );
}

export default Dashboard;