/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const WarehouseShop = () => {
  const { slug } = useParams();
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const { data } = await axios.get(`/api/v1/warehouse/${slug}`);
        setWarehouse(data.warehouse);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchWarehouse();
  }, [slug]);

  return (
    <div>
      {warehouse && (
        <div>
          <h1>{warehouse.name}</h1>
          <p>Description: {warehouse.description}</p>
          <h2>warehouse</h2>
          <ul>
            {warehouse.map(category => (
              <li key={category._id}>
                <Link to={`/dashboard/admin/Warehouses/${slug}/categories/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WarehouseShop;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const WarehouseShop = () => {
  const { slug } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        // Fetch warehouse details
        const warehouseResponse = await axios.get(`/api/v1/warehouse/${slug}`);
        setWarehouse(warehouseResponse.data.warehouse);

        // Fetch categories for the warehouse
        const categoriesResponse = await axios.get(`/api/v1/warehouse/${slug}/categories`);
        setCategories(categoriesResponse.data.categories);

        // Fetch products for the warehouse
        const productsResponse = await axios.get(`/api/v1/warehouse/${slug}/products`);
        setProducts(productsResponse.data.products);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchWarehouseData();
  }, [slug]);

  return (
    <div>
      {warehouse && (
        <div>
          <h1>{warehouse.name}</h1>
          <p>Description: {warehouse.description}</p>
          <h2>Categories</h2>
          <ul>
            {categories.map(category => (
              <li key={category._id}>
                <Link to={`/dashboard/admin/Warehouses/${slug}/categories/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2>Products</h2>
          <ul>
            {products.map(product => (
              <li key={product.productId}>
                <Link to={`/product/${product.slug}`}>
                  {product.name} - ${product.price}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WarehouseShop;
