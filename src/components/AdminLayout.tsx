
import React from 'react';
import { Outlet } from 'react-router-dom';
import AutoCareSidebar from './AutoCareSidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <AutoCareSidebar />
      <main className="admin-main flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
