import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isBuyer, setIsBuyer] = useState(false); // Track if the user is a buyer

  useEffect(() => {
    if (user?.email) {
      fetchAllOrders();
    }
  }, [user]);

  useEffect(() => {
    if (isBuyer) {
      toast.error("Customer cannot add food. You are listed as a buyer.");
    }
  }, [isBuyer]); // Only show toast when isBuyer is true

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/orders/${user?.email}`,
        { withCredentials: true }
      );
      setOrders(data);

      // Check if the user is a buyer (if their email matches any in the orders)
      const isBuyerEmail = data.some(order => order.buyerEmail === user.email);
      setIsBuyer(isBuyerEmail);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch your orders.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.foodName.value;
    const image = form.foodImage.value;
    const category = form.foodCategory.value;
    const quantity = form.quantity.value;
    const priceUSD = form.price.value;  // Price in USD
    const addedBy = form.addedBy.value; // Assuming the name and email come from the AuthContext
    const origin = form.foodOrigin.value;
    const description = form.description.value;

    const formData = {
      name,
      image,
      category,
      quantity,
      price: priceUSD,  // Send the price as USD
      addBy: {
        addedBy,
        name: user?.displayName,
        photo: user?.photoURL
      },
      origin,
      description,
      total_sold: 0
    };

    try {
      // Send the formData to the backend via API call
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/add-foods`,
        formData,
        { withCredentials: true }
      );
      form.reset();
      toast.success("Food Added Successfully");
      navigate("/my-foods");
    } catch (err) {
      toast.error("Failed to add Food");
    }
  };

  return (
    <div className="container mx-auto p-10 m-20">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Food</h2>

      <form onSubmit={handleSubmit} className=" p-8 rounded-lg shadow-lg space-y-4">
        {/* Food Name */}
        <div>
          <label htmlFor="foodName" className="block text-lg font-medium mb-2">Food Name</label>
          <input
            id="foodName"
            name="foodName"
            type="text"
            placeholder="Enter food name"
            className="w-full p-3 border border-gray-300 text-pink-800 rounded-md"
          />
        </div>

        {/* Food Image */}
        <div>
          <label htmlFor="foodImage" className="block text-lg font-medium mb-2">Food Image URL</label>
          <input
            id="foodImage"
            name="foodImage"
            type="text"
            placeholder="Enter image URL"
            className="w-full text-pink-800 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Food Category */}
        <div>
          <label htmlFor="foodCategory" className="block text-lg font-medium mb-2">Food Category</label>
          <input
            id="foodCategory"
            name="foodCategory"
            type="text"
            placeholder="Enter food category"
            className="w-full text-pink-800 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium mb-2">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            className="w-full p-3 text-pink-800 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price in USD */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-2">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="Enter price in USD"
            className="w-full p-3 text-pink-800 border border-gray-300 rounded-md"
          />
        </div>

        {/* Add By */}
        <div>
          <label htmlFor="addedBy" className="block text-lg font-medium mb-2">Added By</label>
          <input
            id="addedBy"
            name="addedBy"
            type="text"
            defaultValue={user.email}
            disabled
            className="w-full p-3 border text-pink-800 border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Food Origin */}
        <div>
          <label htmlFor="foodOrigin" className="block text-lg font-medium mb-2">Food Origin (Country)</label>
          <input
            id="foodOrigin"
            name="foodOrigin"
            type="text"
            placeholder="Enter food origin country"
            className="w-full p-3 border text-pink-800 border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description (ingredients, making procedure, etc.)"
            className="w-full p-3 border text-pink-800 border-gray-300 rounded-md"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
            disabled={isBuyer} // Disable button if user is a buyer
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
