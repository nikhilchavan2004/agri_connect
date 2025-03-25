import React, { useState } from "react";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentDescription: "",
    equipmentType: "",
    dailyRentPrice: 0,
    weeklyRentPrice: 0,
    monthlyRentPrice: 0,
    availableQuantity: 1,
    condition: "Excellent",
    manufacturer: "",
    modelYear: new Date().getFullYear(),
    location: "",
    rentalTerms: "",
    isAvailable: true,
    equipmentImages: [],
  });
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
  };

  const handleImageSubmit = () => {
    if (
      images.length > 0 &&
      images.length + formData.equipmentImages.length < 6
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            equipmentImages: formData.equipmentImages.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err)
          setImageUploadError("Image upload failed", err);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 5 images per equipment");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name.replace(/\s/g, "");
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadPercent(Math.floor(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      equipmentImages: formData.equipmentImages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.equipmentName === "" ||
      formData.equipmentDescription === "" ||
      formData.equipmentType === "" ||
      formData.dailyRentPrice === 0 ||
      formData.availableQuantity === 0 ||
      formData.location === ""
    ) {
      alert("Please fill all required fields!");
      return;
    }
    if (formData.dailyRentPrice < 0 || formData.weeklyRentPrice < 0 || formData.monthlyRentPrice < 0) {
      alert("Rental prices cannot be negative!");
      return;
    }
    if (formData.availableQuantity < 1) {
      alert("Available quantity must be at least 1!");
      return;
    }
    
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/equipment/add-equipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success === false) {
        setError(data?.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);
      alert("Equipment added successfully!");
      setFormData({
        equipmentName: "",
        equipmentDescription: "",
        equipmentType: "",
        dailyRentPrice: 0,
        weeklyRentPrice: 0,
        monthlyRentPrice: 0,
        availableQuantity: 1,
        condition: "Excellent",
        manufacturer: "",
        modelYear: new Date().getFullYear(),
        location: "",
        rentalTerms: "",
        isAvailable: true,
        equipmentImages: [],
      });
      setImages([]);
    } catch (err) {
      console.log(err);
      setError("Failed to add equipment");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-4 bg-green-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-4 border border-green-200"
      >
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Add Agricultural Equipment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="equipmentName" className="block text-sm font-medium text-green-700">
              Equipment Name*
            </label>
            <input
              type="text"
              id="equipmentName"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.equipmentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="equipmentType" className="block text-sm font-medium text-green-700">
              Equipment Type*
            </label>
            <select
              id="equipmentType"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.equipmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Plow">Plow</option>
              <option value="Seeder">Seeder</option>
              <option value="Irrigation">Irrigation System</option>
              <option value="Sprayer">Sprayer</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="equipmentDescription" className="block text-sm font-medium text-green-700">
            Description*
          </label>
          <textarea
            id="equipmentDescription"
            rows={3}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.equipmentDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="dailyRentPrice" className="block text-sm font-medium text-green-700">
              Daily Rent Price (₹)*
            </label>
            <input
              type="number"
              id="dailyRentPrice"
              min="0"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.dailyRentPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="weeklyRentPrice" className="block text-sm font-medium text-green-700">
              Weekly Rent Price (₹)
            </label>
            <input
              type="number"
              id="weeklyRentPrice"
              min="0"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.weeklyRentPrice}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="monthlyRentPrice" className="block text-sm font-medium text-green-700">
              Monthly Rent Price (₹)
            </label>
            <input
              type="number"
              id="monthlyRentPrice"
              min="0"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.monthlyRentPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="availableQuantity" className="block text-sm font-medium text-green-700">
              Available Quantity*
            </label>
            <input
              type="number"
              id="availableQuantity"
              min="1"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.availableQuantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="condition" className="block text-sm font-medium text-green-700">
              Condition
            </label>
            <select
              id="condition"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="manufacturer" className="block text-sm font-medium text-green-700">
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="modelYear" className="block text-sm font-medium text-green-700">
              Model Year
            </label>
            <input
              type="number"
              id="modelYear"
              min="2000"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.modelYear}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-green-700">
            Location*
          </label>
          <input
            type="text"
            id="location"
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rentalTerms" className="block text-sm font-medium text-green-700">
            Rental Terms & Conditions
          </label>
          <textarea
            id="rentalTerms"
            rows={3}
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.rentalTerms}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAvailable"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          <label htmlFor="isAvailable" className="block text-sm font-medium text-green-700">
            Currently Available for Rent
          </label>
        </div>

        <div className="space-y-2">
          <label htmlFor="equipmentImages" className="block text-sm font-medium text-green-700">
            Equipment Images (Max 5)
          </label>
          <input
            type="file"
            id="equipmentImages"
            multiple
            accept="image/*"
            className="block w-full text-sm text-green-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-700
              hover:file:bg-green-200"
            onChange={(e) => setImages(e.target.files)}
          />
          <p className="text-xs text-green-600">Upload clear images of the equipment from multiple angles</p>
        </div>

        {(imageUploadError || error) && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {imageUploadError || error}
          </div>
        )}

        {images.length > 0 && (
          <button
            type="button"
            onClick={handleImageSubmit}
            disabled={uploading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
          >
            {uploading ? `Uploading (${imageUploadPercent}%)` : "Upload Images"}
          </button>
        )}

        {formData.equipmentImages.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-green-700">Uploaded Images:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {formData.equipmentImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Equipment ${index}`}
                    className="w-full h-32 object-cover rounded-md border border-green-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
        >
          {loading ? "Adding Equipment..." : "Add Equipment"}
        </button>
      </form>
    </div>
  );
};

export default AddEquipment;