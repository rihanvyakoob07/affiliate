"use client";

import { useState, useContext } from "react";
import { GlobalContext } from "../../AdminGlobalContext";
import axios from "axios";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

const baseUrl = "http://localhost:3001";

function Page() {
  const { data, setdata } = useContext(GlobalContext);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    price: "",
    url: "",
    description: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  
  const handleEdit = (product) => {
    setEditProduct(product);
    setUpdatedData({
      name: product.name,
      price: product.price,
      url: product.url,
      description: product.description,
      image: product.image,
    });
    setImagePreview(product.image ? `${baseUrl}${product.image}` : ""); // Existing image preview
    setErrorMessage("");
  };

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImagePreview(imageUrl);
      setUpdatedData({ ...updatedData, image: file });
    }
  };

 
  const updateProduct = async () => {
    if (!updatedData.url.trim()) {
      setErrorMessage("URL cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("name", updatedData.name);
    formData.append("price", updatedData.price);
    formData.append("url", updatedData.url);
    formData.append("description", updatedData.description);

 
    if (updatedData.image instanceof File) {
      formData.append("image", updatedData.image);
    }

    try {
      const response = await axios.put(
        `${baseUrl}/api/products/${editProduct.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      
      setdata((prevData) =>
        prevData.map((el) =>
          el.id === editProduct.id ? { ...el, ...response.data } : el
        )
      );

      setEditProduct(null);
      setUpdatedData({ name: "", price: "", url: "", description: "", image: null });
      setImagePreview("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      setdata((prevData) => prevData.filter((el) => el.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Products</h1>

      {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((el) => (
        <div
          key={el.id}
          className="bg-gradient-to-br from-gray-50 to-gray-200 text-black shadow-xl rounded-2xl p-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          {el.image && (
            <div className="overflow-hidden rounded-md">
              <img
                src={`${baseUrl}${el.image}`}
                alt={el.name}
                className="w-full h-[180px] object-cover rounded-md transition-transform duration-300 hover:scale-110"
              />
            </div>
          )}
          <p className="text-md bg-stone-200 p-2 rounded-sm w-fit my-2 font-semibold text-gray-800">
           {el.name.charAt(0).toUpperCase() + el.name.slice(1).toLowerCase()}
          </p>
          <p className="mt-2 text-gray-600 text-sm">{el.description}</p>
          <div className="w-full flex items-center justify-between mt-3">
            <p className="text-green-500 font-bold text-lg">${el.price}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEdit(el)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => deleteProduct(el.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>



      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed text-black top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Product</h2>

            {/* Name */}
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />

            {/* Price */}
            <input
              type="text"
              name="price"
              value={updatedData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />

            <select name="category" value={updatedData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-2">
              <option value="">Select Category</option>
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Clothes">Clothes</option>
              <option value="Audio">Audio</option>
              <option value="Gaming">Gaming</option>
                <option value="Watches">Watches</option>
            
            </select>

            {/* URL */}
            <input
              type="text"
              name="url"
              value={updatedData.url}
              onChange={handleChange}
              placeholder="Product URL"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />

            {/* Description */}
            <textarea
              name="description"
              value={updatedData.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />

            {/* Show Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-[150px] object-cover rounded-md mb-2"
              />
            )}

            {/* Error Message */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
