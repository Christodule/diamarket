import React from "react";
import { NavLink } from "react-router-dom";

const FleetAdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>Fleet Admin Panel</h4>
        <NavLink
          to="/dashboard/fleetadmin/warehouses"
          className="list-group-item list-group-item-action"
        >
          Manage Warehouses
        </NavLink>
        <NavLink
          to="/dashboard/fleetadmin/products"
          className="list-group-item list-group-item-action"
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/dashboard/fleetadmin/orders"
          className="list-group-item list-group-item-action"
        >
          Manage Orders
        </NavLink>
      </div>
    </div>
  );
};

export default FleetAdminMenu;
