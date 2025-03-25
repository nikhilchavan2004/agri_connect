import React, { useState, useEffect } from 'react';
import { GiFarmTractor } from "react-icons/gi";
import { motion } from 'framer-motion';

const EquipmentRentalCard = ({ equipment }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-green-200 transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={equipment.imageUrl} 
          alt={equipment.name} 
          className="w-full h-full object-cover transition-all duration-500"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded-md text-sm font-bold">
          For Rent
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-green-800 mb-2">{equipment.name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GiFarmTractor className="text-green-600 mr-1" />
            <span className="text-gray-600 text-sm">{equipment.category}</span>
          </div>
          
          <motion.div 
            className="bg-green-700 text-white py-1 px-3 rounded-full font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ₹{equipment.pricePerDay}/day
          </motion.div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Availability:</span> {equipment.availability}
          </div>
          
          <motion.button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rent Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const EquipmentRentalSection = () => {
  // Data with SVG image representations for agricultural equipment
  const equipments = [
    {
      id: 1,
      name: "Modern Tractor",
      category: "Heavy Machinery",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M30 110h140v10H30z" fill="%23374151"/><path d="M50 80h80v30H50z" fill="%23059669"/><path d="M130 80h20v30h-20z" fill="%23059669"/><circle cx="60" cy="120" r="15" fill="%23111827"/><circle cx="60" cy="120" r="7" fill="%23d1d5db"/><circle cx="140" cy="120" r="20" fill="%23111827"/><circle cx="140" cy="120" r="10" fill="%23d1d5db"/><path d="M40 80h100v-10H60L40 80z" fill="%23047857"/><path d="M40 80V60h20v20H40z" fill="%23059669"/></svg>`,
      pricePerDay: 2500,
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Seed Drill",
      category: "Planting",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M40 50h120v10H40z" fill="%23374151"/><path d="M40 60h120v10H40z" fill="%23059669"/><path d="M50 70h10v50H50z" fill="%23059669"/><path d="M70 70h10v50H70z" fill="%23059669"/><path d="M90 70h10v50H90z" fill="%23059669"/><path d="M110 70h10v50h-10z" fill="%23059669"/><path d="M130 70h10v50h-10z" fill="%23059669"/><circle cx="55" cy="130" r="10" fill="%23111827"/><circle cx="135" cy="130" r="10" fill="%23111827"/><path d="M50 120h100v10H50z" fill="%23374151"/></svg>`,
      pricePerDay: 1200,
      availability: "Available Now"
    },
    {
      id: 3,
      name: "Rotavator",
      category: "Soil Preparation",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M40 60h120v20H40z" fill="%23059669"/><path d="M120 80h40v10h-40z" fill="%23374151"/><path d="M40 80h60v10H40z" fill="%23374151"/><circle cx="140" cy="100" r="15" fill="%23111827"/><path d="M40 80v30h20V80H40z" fill="%23d97706"/><path d="M60 100h10v10H60z" fill="%23d97706"/><path d="M70 100h10v10H70z" fill="%23d97706"/><path d="M80 100h10v10H80z" fill="%23d97706"/><path d="M90 100h10v10H90z" fill="%23d97706"/><path d="M100 100h10v10h-10z" fill="%23d97706"/><path d="M110 100h10v10h-10z" fill="%23d97706"/><path d="M120 100h10v10h-10z" fill="%23d97706"/></svg>`,
      pricePerDay: 800,
      availability: "2 Days Wait"
    },
    {
      id: 4,
      name: "Combine Harvester",
      category: "Harvesting",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M20 90h140v20H20z" fill="%23059669"/><path d="M160 70h20v40h-20z" fill="%23d97706"/><path d="M140 70h20v20h-20z" fill="%23d97706"/><path d="M120 60h20v30h-20z" fill="%23059669"/><path d="M40 70h80v20H40z" fill="%23059669"/><path d="M20 70h20v20H20z" fill="%23059669"/><circle cx="40" cy="120" r="10" fill="%23111827"/><circle cx="80" cy="120" r="10" fill="%23111827"/><circle cx="140" cy="120" r="15" fill="%23111827"/><path d="M20 110h140v10H20z" fill="%23374151"/></svg>`,
      pricePerDay: 3500,
      availability: "Available Now"
    },
    {
      id: 5,
      name: "Sprayer",
      category: "Crop Protection",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M60 40h80v50H60z" fill="%23059669"/><path d="M100 90v30" stroke="%23374151" stroke-width="4"/><path d="M90 120h20v10H90z" fill="%23374151"/><path d="M80 100h40v10H80z" fill="%23374151"/><circle cx="70" cy="50" r="5" fill="%23d97706"/><circle cx="130" cy="50" r="5" fill="%23d97706"/><circle cx="70" cy="70" r="5" fill="%23d97706"/><circle cx="130" cy="70" r="5" fill="%23d97706"/><path d="M60 120h80v10H60z" fill="%23374151"/><circle cx="70" cy="130" r="10" fill="%23111827"/><circle cx="130" cy="130" r="10" fill="%23111827"/></svg>`,
      pricePerDay: 600,
      availability: "Available Now"
    },
    {
      id: 6,
      name: "Thresher",
      category: "Harvesting",
      imageUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="none"><rect width="200" height="150" fill="%23f3f4f6"/><path d="M40 60h120v40H40z" fill="%23059669"/><path d="M30 100h140v10H30z" fill="%23374151"/><circle cx="50" cy="120" r="10" fill="%23111827"/><circle cx="150" cy="120" r="10" fill="%23111827"/><path d="M60 60h10v-20H60z" fill="%23d97706"/><path d="M80 60h10v-20H80z" fill="%23d97706"/><path d="M100 60h10v-20h-10z" fill="%23d97706"/><path d="M120 60h10v-20h-10z" fill="%23d97706"/><path d="M140 60h10v-20h-10z" fill="%23d97706"/></svg>`,
      pricePerDay: 1000,
      availability: "Available Now"
    }
  ];

  return (
    <div className="w-full py-8">
      <motion.div 
        className="flex items-center justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <GiFarmTractor className="text-green-600 text-4xl mr-3" />
        <h2 className="text-3xl font-bold text-green-800 font-serif">Farm Equipment Rentals</h2>
      </motion.div>
      
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Access modern farming equipment without the high investment costs. Rent what you need, when you need it.
      </p>
      
      <motion.div 
        className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6 my-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {equipments.map((equipment) => (
          <EquipmentRentalCard key={equipment.id} equipment={equipment} />
        ))}
      </motion.div>
      
      <div className="flex justify-center mt-8">
        <motion.button 
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-bold shadow-md flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GiFarmTractor className="text-lg" />
          View All Equipment
        </motion.button>
      </div>
    </div>
  );
};

export default EquipmentRentalSection;