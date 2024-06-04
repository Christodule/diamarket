import React from "react";
import FleetAdminMenu from "../../components/Layout/FleetAdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const FleetAdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <FleetAdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Fleet Admin Name: {auth?.user?.name}</h3>
              <h3>Fleet Admin Email: {auth?.user?.email}</h3>
              <h3>Fleet Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FleetAdminDashboard;
