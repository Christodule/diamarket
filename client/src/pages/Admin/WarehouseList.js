import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WarehousList = () => {
  const [warehouses, setWarehouses] = useState([]);

  // Get all warehouses
  const getAllWarehouses = async () => {
    try {
      const { data } = await axios.get("/api/v1/warehouse/get-warehouse");
      setWarehouses(data.warehouses);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching warehouses");
    }
  };

  // Lifecycle method to fetch data
  useEffect(() => {
    getAllWarehouses();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Warehouses List</h1>
          <div className="d-flex flex-wrap">
            {warehouses.map((warehouse) => (
              <Link
                key={warehouse._id}
                to={`/admin/WarehouseDetail/${warehouse.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{warehouse.name}</h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WarehousList;
 