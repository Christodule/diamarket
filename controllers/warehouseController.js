import warehouseModel from "../models/warehouseModel.js";
import categoryModel from "../models/categoryModel.js";
import warehouseCategoryModel from "../models/warehouseCategoryModel.js";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const createWareHouseController = async (req, res) => {
  try {
    const { name, province, city, district, street, number, totalAreaVolume, categories } = req.fields;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !province:
        return res.status(500).send({ error: "Province is required" });
      case !city:
        return res.status(500).send({ error: "City is required" });
      case !district:
        return res.status(500).send({ error: "District is required" });
      case !street:
        return res.status(500).send({ error: "Street is required" });
      case !number:
        return res.status(500).send({ error: "Number is required" });
      case !totalAreaVolume:
        return res.status(500).send({ error: "Total area volume is required" });
    }

    const warehouse = new warehouseModel({ ...req.fields, slug: slugify(name) });
    await warehouse.save();

    // Handle categories
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await new warehouseCategoryModel({
          warehouse: warehouse._id,
          category: categoryId,
        }).save();
      }
    }

    res.status(201).send({
      success: true,
      message: "Warehouse created successfully",
      warehouse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating warehouse",
    });
  }
};

export const getWareHousesController = async (req, res) => {
  try {
    const warehouses = await warehouseModel.find({}).limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: warehouses.length,
      message: "All warehouses",
      warehouses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting warehouses",
      error: error.message,
    });
  }
};



export const getWareHouseController = async (req, res) => {
  try {
    const warehouse = await warehouseModel.findOne({ slug: req.params.slug });
    if (!warehouse) {
      return res.status(404).send({ success: false, message: "Warehouse not found" });
    }

    const products = await productModel.find({ warehouse: warehouse._id }).populate('category');
    const categoriesMap = new Map();

    products.forEach(product => {
      if (product.category) {
        if (!categoriesMap.has(product.category._id)) {
          categoriesMap.set(product.category._id, {
            ...product.category._doc,
            products: [],
          });
        }
        categoriesMap.get(product.category._id).products.push(product);
      }
    });

    const categories = Array.from(categoriesMap.values());

    res.status(200).send({
      success: true,
      message: "Single warehouse fetched",
      warehouse,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single warehouse",
      error,
    });
  }
};

export const updateWareHouseController = async (req, res) => {
  try {
    const { name, province, city, district, street, number, totalAreaVolume, categories } = req.fields;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !province:
        return res.status(500).send({ error: "Province is required" });
      case !city:
        return res.status(500).send({ error: "City is required" });
      case !district:
        return res.status(500).send({ error: "District is required" });
      case !street:
        return res.status(500).send({ error: "Street is required" });
      case !number:
        return res.status(500).send({ error: "Number is required" });
      case !totalAreaVolume:
        return res.status(500).send({ error: "Total area volume is required" });
    }

    const warehouse = await warehouseModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    // Handle categories
    await warehouseCategoryModel.deleteMany({ warehouse: warehouse._id });
    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        await new warehouseCategoryModel({
          warehouse: warehouse._id,
          category: categoryId,
        }).save();
      }
    }

    res.status(201).send({
      success: true,
      message: "Warehouse updated successfully",
      warehouse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating warehouse",
    });
  }
};

export const deleteWarehouseController = async (req, res) => {
  try {
    await warehouseModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Warehouse deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting warehouse",
      error,
    });
  }
};

export const warehousesFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.name = checked;
    if (radio.length) args.totalAreaVolume = { $gte: radio[0], $lte: radio[1] };
    const warehouses = await warehouseModel.find(args);
    res.status(200).send({
      success: true,
      warehouses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering warehouses",
      error,
    });
  }
};

export const searchWarehouseController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await warehouseModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search warehouse API",
      error,
    });
  }
};
