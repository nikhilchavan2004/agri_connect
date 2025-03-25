import  { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { 
  UserCircle2, 
  LogOut, 
  Edit, 
  Trash2, 
  Camera 
} from 'lucide-react';
import { app } from "../../firebase";
import AllBookings from "./AllBookings";
import AdminUpdateProfile from "./AdminUpdateProfile";
import AddPackages from "./AddPackages";
import AllPackages from "./AllPackages";
import AllUsers from "./AllUsers";
import Payments from "./Payments";
import RatingsReviews from "./RatingsReviews";
import History from "./History";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      alert(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure ? the account will be permenantly deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        alert(data?.message);
      } catch (error) {}
    }
  };

  return (
    
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    {currentUser ? (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Enhanced Profile Section */}
        <div className="md:col-span-1 bg-white shadow-2xl rounded-3xl p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative flex flex-col items-center">
            {/* Profile Photo Container */}
            <div className="relative group mb-6">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-blue-100">
                <img
                  src={
                    (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                    formData.avatar ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-300"
                />
                <div 
                  onClick={() => fileRef.current.click()}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <Camera className="text-white w-12 h-12" />
                </div>
              </div>
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
              />
            </div>

            {/* Photo Upload Button */}
            {profilePhoto && (
              <div className="w-full mb-4">
                <button
                  onClick={() => handleProfilePhoto(profilePhoto)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all flex items-center justify-center"
                >
                  {loading ? `Uploading (${photoPercentage}%)` : "Upload Photo"}
                </button>
              </div>
            )}

            {/* User Details */}
            <div className="text-center w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {currentUser.username}
              </h2>
              <p className="text-blue-600 text-lg mb-4">{currentUser.email}</p>

              {/* User Stats */}
              <div className="grid grid-cols-3 gap-4 bg-gray-100 rounded-xl p-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{currentUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">Admin</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-semibold">
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setActivePanelId(8)}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all flex items-center justify-center"
                >
                  <Edit className="mr-2" /> Edit Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all flex items-center justify-center"
                >
                  <LogOut className="mr-2" /> Log Out
                </button>
                
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-red-600 hover:text-red-800 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="mr-2" /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

       
            

          {/* Main Content Section */}
          <div className="md:col-span-2 bg-white rounded-2xl">
            {/* Navigation Tabs */}
            <div className="border-b px-4 py-3 overflow-x-auto">
              <div className="flex space-x-2">
                {[
                  { id: 1, name: "Bookings" },
                  { id: 2, name: "Add Packages" },
                  { id: 3, name: "All Packages" },
                  { id: 4, name: "Users" },
                  { id: 5, name: "Payments" },
                  { id: 6, name: "Ratings/Reviews" },
                  { id: 7, name: "History" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activePanelId === tab.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActivePanelId(tab.id)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Panel */}
            <div className="p-4">
              {activePanelId === 1 ? (
                <AllBookings />
              ) : activePanelId === 2 ? (
                <AddPackages />
              ) : activePanelId === 3 ? (
                <AllPackages />
              ) : activePanelId === 4 ? (
                <AllUsers />
              ) : activePanelId === 5 ? (
                <Payments />
              ) : activePanelId === 6 ? (
                <RatingsReviews />
              ) : activePanelId === 7 ? (
                <History />
              ) : activePanelId === 8 ? (
                <AdminUpdateProfile />
              ) : (
                <div>Page Not Found!</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-red-700">Login First</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;