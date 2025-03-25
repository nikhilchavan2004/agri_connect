import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTractor } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Rating } from "@mui/material";

const EquipmentBooking = () => {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    description: "",
    category: "",
    dailyRate: 0,
    weeklyRate: 0,
    monthlyRate: 0,
    rating: 0,
    totalRatings: 0,
    images: [],
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    equipmentId: null,
    renter: null,
    duration: 1,
    durationType: "daily",
    startDate: null,
    endDate: null
  });
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getEquipmentData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/equipment/get-equipment/${params?.equipmentId}`
      );
      const data = await res.json();
      if (data?.success) {
        setEquipmentData({
          name: data?.equipment?.name,
          description: data?.equipment?.description,
          category: data?.equipment?.category,
          dailyRate: data?.equipment?.dailyRate,
          weeklyRate: data?.equipment?.weeklyRate,
          monthlyRate: data?.equipment?.monthlyRate,
          rating: data?.equipment?.rating,
          totalRatings: data?.equipment?.totalRatings,
          images: data?.equipment?.images,
          location: data?.equipment?.location
        });
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/equipment/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [currentUser]);

  // Handle payment & book equipment
  const handleRentEquipment = async () => {
    if (
      !bookingData.equipmentId ||
      !bookingData.renter ||
      bookingData.totalPrice <= 0 ||
      bookingData.duration <= 0 ||
      !bookingData.startDate ||
      !bookingData.endDate
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/rent-equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.equipmentId) {
      getEquipmentData();
    }
    let date = new Date().toISOString().substring(0, 10);
    setCurrentDate(date);
  }, [params?.equipmentId]);

  useEffect(() => {
    if (equipmentData && params?.equipmentId) {
      setBookingData({
        ...bookingData,
        equipmentId: params?.equipmentId,
        renter: currentUser?._id,
        totalPrice: calculateTotalPrice()
      });
    }
  }, [equipmentData, params, bookingData.duration, bookingData.durationType]);

  const calculateTotalPrice = () => {
    let rate = 0;
    switch(bookingData.durationType) {
      case "daily":
        rate = equipmentData.dailyRate;
        break;
      case "weekly":
        rate = equipmentData.weeklyRate;
        break;
      case "monthly":
        rate = equipmentData.monthlyRate;
        break;
      default:
        rate = equipmentData.dailyRate;
    }
    return rate * bookingData.duration;
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const endDate = new Date(selectedDate);
    endDate.setDate(selectedDate.getDate() + bookingData.duration);
    
    setBookingData({
      ...bookingData,
      startDate: e.target.value,
      endDate: endDate.toISOString().substring(0, 10)
    });
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen py-8">
      <div className="w-[95%] max-w-6xl flex flex-col items-center p-6 rounded-lg shadow-lg gap-6 bg-white border border-green-100">
        <h1 className="text-center font-bold text-3xl text-green-800 flex items-center gap-2">
          <FaTractor /> Rent Agricultural Equipment
        </h1>
        
        {/* User and Equipment Info */}
        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* User Info */}
          <div className="lg:w-1/2 p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700">Full Name</label>
                <div className="mt-1 p-2 bg-white rounded-md border border-green-300">
                  {currentUser?.username}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">Email</label>
                <div className="mt-1 p-2 bg-white rounded-md border border-green-300">
                  {currentUser?.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">Address</label>
                <div className="mt-1 p-2 bg-white rounded-md border border-green-300 min-h-[80px]">
                  {currentUser?.address || "Please update your profile with address"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">Phone</label>
                <div className="mt-1 p-2 bg-white rounded-md border border-green-300">
                  {currentUser?.phone || "Not provided"}
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Info */}
          <div className="lg:w-1/2 p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Equipment Details</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/3">
                <img
                  src={equipmentData.images[0]}
                  alt={equipmentData.name}
                  className="w-full h-40 object-cover rounded-lg border border-green-200"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl font-bold text-green-800">{equipmentData.name}</h3>
                <p className="flex items-center text-green-600 mt-1">
                  <FaMapMarkerAlt className="mr-2" /> {equipmentData.location}
                </p>
                <div className="flex items-center mt-2">
                  <Rating
                    value={equipmentData.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    ({equipmentData.totalRatings} reviews)
                  </span>
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  {equipmentData.description}
                </p>
              </div>
            </div>

            {/* Rental Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700">Rental Period</label>
                  <select
                    className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm"
                    value={bookingData.durationType}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      durationType: e.target.value,
                      totalPrice: calculateTotalPrice()
                    })}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">
                    {bookingData.durationType === "daily" ? "Days" : 
                     bookingData.durationType === "weekly" ? "Weeks" : "Months"}
                  </label>
                  <div className="flex items-center mt-1">
                    <button
                      className="p-2 bg-green-600 text-white rounded-l-md"
                      onClick={() => {
                        if (bookingData.duration > 1) {
                          setBookingData({
                            ...bookingData,
                            duration: bookingData.duration - 1,
                            totalPrice: calculateTotalPrice()
                          });
                        }
                      }}
                    >
                      -
                    </button>
                    <div className="p-2 w-12 text-center border-t border-b border-green-300">
                      {bookingData.duration}
                    </div>
                    <button
                      className="p-2 bg-green-600 text-white rounded-r-md"
                      onClick={() => {
                        if (bookingData.duration < 30) {
                          setBookingData({
                            ...bookingData,
                            duration: bookingData.duration + 1,
                            totalPrice: calculateTotalPrice()
                          });
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700">Start Date</label>
                  <input
                    type="date"
                    min={currentDate}
                    className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm"
                    onChange={handleDateChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700">End Date</label>
                  <input
                    type="date"
                    value={bookingData.endDate || ""}
                    min={bookingData.startDate || currentDate}
                    className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm"
                    disabled
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-700">Rate:</span>
                  <span className="font-bold">
                    ₹{bookingData.durationType === "daily" ? equipmentData.dailyRate : 
                      bookingData.durationType === "weekly" ? equipmentData.weeklyRate : equipmentData.monthlyRate}
                    /{bookingData.durationType === "daily" ? "day" : 
                      bookingData.durationType === "weekly" ? "week" : "month"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-green-800">
                  <span>Total Price:</span>
                  <span>₹{bookingData.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="w-full p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Payment Details</h2>
          <div className="max-w-md mx-auto">
            <p className={`text-sm mb-4 ${instance ? "text-red-600" : "text-gray-600"}`}>
              {!instance
                ? "Loading payment gateway..."
                : "For demo purposes, use test card: 4111 1111 1111 1111, Exp: 12/25, CVV: 123"}
            </p>
            
            {clientToken && (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="w-full mt-6 p-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300 disabled:opacity-70"
                  onClick={handleRentEquipment}
                  disabled={loading || !instance || !currentUser?.address}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Rental"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentBooking;