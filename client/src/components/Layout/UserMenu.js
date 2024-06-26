import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>User Panel</h4>
        <NavLink
          to="/dashboard/user/products"
          className="list-group-item list-group-item-action"
        >
          My Products
        </NavLink>
        <NavLink
          to="/dashboard/user/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          My Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
