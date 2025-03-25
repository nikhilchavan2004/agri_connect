import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";

const Search = () => {
  const navigate = useNavigate();
  const [sideBarSearchData, setSideBarSearchData] = useState({
    searchTerm: "",
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSideBarSearchData({
        searchTerm: searchTermFromUrl || "",
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchAllPackages = async () => {
      setLoading(true);
      setShowMoreBtn(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/package/get-packages?${searchQuery}`);
        const data = await res.json();
        setLoading(false);
        setAllPackages(data?.packages);
        if (data?.packages?.length > 8) {
          setShowMoreBtn(true);
        } else {
          setShowMoreBtn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPackages();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarSearchData({
        ...sideBarSearchData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "offer") {
      setSideBarSearchData({
        ...sideBarSearchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSideBarSearchData({ ...sideBarSearchData, sort, order });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarSearchData.searchTerm);
    urlParams.set("offer", sideBarSearchData.offer);
    urlParams.set("sort", sideBarSearchData.sort);
    urlParams.set("order", sideBarSearchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreSClick = async () => {
    const numberOfPackages = allPackages.length;
    const startIndex = numberOfPackages;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/package/get-packages?${searchQuery}`);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setAllPackages([...allPackages, ...data?.packages]);
  };

  return (
    <div className="flex flex-col md:flex-row bg-amber-50">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-amber-100 border-amber-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-amber-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            ARGI CONNECT 
          </h2>
          <p className="text-amber-700 mt-1 text-sm">Find equipment from local farmers</p>
        </div>
        
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-amber-800">Equipment:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Tractor, Harvester, Plow..."
              className="border border-amber-400 rounded-lg p-3 w-full focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
              value={sideBarSearchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-amber-800">Availability:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-amber-600"
                checked={sideBarSearchData.offer}
                onChange={handleChange}
              />
              <span className="text-amber-700">Special Discount</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-amber-800">Sort By:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="p-3 border border-amber-400 rounded-lg bg-white text-amber-800 focus:ring-2 focus:ring-amber-500 focus:outline-none w-full"
            >
              <option value="packagePrice_desc">Rental Price: High to Low</option>
              <option value="packagePrice_asc">Rental Price: Low to High</option>
              <option value="packageRating_desc">Best Reviewed Equipment</option>
              <option value="packageTotalRatings_desc">Most Rented Equipment</option>
              <option value="createdAt_desc">Recently Added</option>
              <option value="createdAt_asc">Oldest Listings</option>
            </select>
          </div>
          <button className="bg-amber-700 rounded-lg text-white p-3 uppercase hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Equipment
          </button>
        </form>
        
        <div className="mt-8 p-4 bg-amber-200 rounded-lg border border-amber-300">
          <h3 className="font-semibold text-amber-800 mb-2">Why Rent Farm Equipment?</h3>
          <ul className="text-sm text-amber-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-amber-800">•</span>
              Save on costly equipment purchases
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-amber-800">•</span>
              Access seasonal tools when needed
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-amber-800">•</span>
              Support your local farming community
            </li>
          </ul>
        </div>
      </div>
      
      {/* ------------------------------------------------------------------------------- */}
      <div className="flex-1 bg-amber-50">
        <h1 className="text-xl font-semibold border-b border-amber-300 p-4 text-amber-800 mt-5 flex items-center bg-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Available Equipment
        </h1>
        
        <div className="w-full p-5 grid 2xl:grid-cols-4 xlplus:grid-cols-3 lg:grid-cols-2 gap-4">
          {!loading && allPackages.length === 0 && (
            <div className="col-span-full p-6 bg-amber-100 rounded-lg border border-amber-300 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xl text-amber-800 font-medium">No Equipment Found!</p>
              <p className="text-amber-700 mt-1">Try different search terms or check back later.</p>
            </div>
          )}
          
          {loading && (
            <div className="col-span-full text-center p-6">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-2"></div>
              <p className="text-xl text-amber-800">
                Loading Available Equipment...
              </p>
            </div>
          )}
          
          {!loading &&
            allPackages &&
            allPackages.map((packageData, i) => (
              <PackageCard key={i} packageData={packageData} />
            ))}
        </div>
        
        {showMoreBtn && (
          <div className="flex justify-center my-6">
            <button
              onClick={onShowMoreSClick}
              className="bg-amber-700 text-white px-5 py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              View More Equipment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;