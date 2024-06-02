import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const WarehouseDetail = () => {
  const { slug } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.error("Slug is undefined");
      return;
    }
    console.log("Fetching warehouse details for slug:", slug);

    const fetchWarehouse = async () => {
      try {
        const { data } = await axios.get(`/api/v1/warehouse/get-warehouse/${slug}`);
        console.log("Fetched warehouse data:", data);
        setWarehouse(data.warehouse);
        setCategories(data.categories || []); // Ensure categories is at least an empty array
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div>
      <h1>{warehouse.name}</h1>
      <p>Description: {warehouse.description}</p>
      <h2>Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link to={`/admin/WarehouseDetail/${slug}/categories/${category.slug}`}>
                {category.name}
              </Link>
              {category.products && category.products.length > 0 && (
                <ul>
                  {category.products.map((product) => (
                    <li key={product._id}>{product.name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
};

export default WarehouseDetail;
