import React from "react";
import aboutImg from "../assets/images/about_img.png";
import { FaExternalLinkAlt, FaInstagram, FaFacebook, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { FaTractor, FaSeedling, FaHandHoldingWater, FaRupeeSign, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full bg-gradient-to-b from-orange-50 via-white to-green-50 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header with Indian flag-inspired design */}
        <div className="relative mb-10 text-center">
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg transform -skew-y-1 z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-t-xl"></div>
          <div className="relative z-10 py-6 px-4">
            <div className="inline-flex items-center justify-center gap-4 mb-2">
              <FaTractor className="text-amber-600 text-4xl" />
              <h1 className="text-5xl font-bold text-blue-900 font-heading">AGRI CONNECT</h1>
              <FaSeedling className="text-green-600 text-4xl" />
            </div>
            <p className="text-xl text-gray-700 mt-2">Empowering Indian Farmers Through Equipment Sharing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Profile Card with Tricolor Accent */}
          <div className="md:col-span-4 bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-white to-green-400 opacity-75 blur-md -z-10 transform scale-110"></div>
                <img 
                  src={aboutImg} 
                  className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg" 
                  alt="Founder Profile" 
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <FaUsers className="text-xl" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-blue-900 mb-1">Shri Sanjay N G</h2>
              <p className="text-green-700 font-medium mb-3">Founder & Agricultural Innovator</p>
              
              <div className="w-full border-t border-gray-200 my-4"></div>
              
              {/* Social Links with hover effects */}
              <div className="flex justify-center gap-5 mt-4">
                <a 
                  href="https://github.com/Sanjayng125" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-all transform hover:scale-110"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a 
                  href="https://linkedin.com/in/sanjay-ng-41b64922a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 transition-all transform hover:scale-110"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a 
                  href="https://instagram.com/sanjay_ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-400 transition-all transform hover:scale-110"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a 
                  href="https://facebook.com/sanjayng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-400 transition-all transform hover:scale-110"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-400 transition-all transform hover:scale-110"
                >
                  <FaWhatsapp className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content with gradient backgrounds */}
          <div className="md:col-span-8">
            <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-6 border-l-4 border-blue-500 shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <FaHandHoldingWater className="text-green-600" />
                Equipment Solutions for Indian Farmers
              </h2>
              <p className="text-gray-800 leading-relaxed mb-4">
                Our mission is to make agricultural equipment accessible to Indian farmers. Small and medium-scale farmers cannot afford to purchase expensive equipment, so we've developed an equipment sharing platform that increases machinery availability and boosts farmer income.
              </p>
              <p className="text-gray-800 leading-relaxed">
                From Punjab to Tamil Nadu, our platform connects thousands of Indian farmers, enabling equipment owners to earn extra income during off-seasons while helping other farmers access modern machinery at affordable rates. Traditional farming meets modern technology through our easy-to-use application designed specifically for the Indian agricultural community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 shadow-lg border-t-2 border-orange-500 hover:-translate-y-1 transition-transform">
                <h3 className="font-bold text-lg text-blue-900 mb-3 flex items-center gap-2">
                  <FaTractor className="text-orange-600" />
                  Equipment Owner Benefits
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Generate additional income from idle equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Secure and insured transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Access to trusted renters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Direct mobile payments</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 shadow-lg border-t-2 border-green-500 hover:-translate-y-1 transition-transform">
                <h3 className="font-bold text-lg text-blue-900 mb-3 flex items-center gap-2">
                  <FaRupeeSign className="text-green-600" />
                  Renter Benefits
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Save up to 70% - rent instead of buying</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Access to modern equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Use crop-specific machinery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Online booking and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials with improved card design */}
        <div className="relative mb-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
          <div className="bg-blue-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px bg-blue-200 flex-grow"></div>
              <h2 className="text-2xl font-bold text-blue-900 px-4">Farmer Testimonials</h2>
              <div className="h-px bg-blue-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-md border-l-3 border-orange-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="w-2 h-10 bg-orange-500 rounded-full mr-3"></div>
                  <p className="text-gray-700 italic">"My tractor used to sit idle for many months of the year. Now I earn an additional ₹45,000 from it. This platform has been a blessing for our village."</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-800 font-medium">- Ramesh Patel</p>
                  <p className="text-gray-500 text-sm">Gujarat</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md border-l-3 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700 italic">"I'm a small farmer and can't afford expensive equipment. Through this app, I've increased my crop productivity by 40%."</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-800 font-medium">- Suresh Singh</p>
                  <p className="text-gray-500 text-sm">Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map & Stats Section (New) */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-5 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-orange-600 text-white p-3 rounded-full mb-3">
              <FaMapMarkedAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">28 States</h3>
            <p className="text-gray-700">Our agricultural community spans across India</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-blue-600 text-white p-3 rounded-full mb-3">
              <FaUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">50,000+ Farmers</h3>
            <p className="text-gray-700">Use our Kisan Saathi platform</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-5 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="bg-green-600 text-white p-3 rounded-full mb-3">
              <FaTractor className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">15,000+ Equipment</h3>
            <p className="text-gray-700">Shared on our platform</p>
          </div>
        </div>
        
        {/* Contact Section with Indian flag-inspired design */}
        <div className="relative bg-white rounded-xl p-6 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-t-xl"></div>
          
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Contact Us</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <a href="tel:+919876543210" className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2 transform hover:scale-105">
              <FaWhatsapp className="text-xl" /> 
              <span>Chat on WhatsApp</span>
            </a>
            <a href="mailto:support@kisansaathi.com" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2 transform hover:scale-105">
              <FaExternalLinkAlt className="text-sm" />
              <span>Send Email</span>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-2 font-medium">Available Payment Options</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">UPI</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cards</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Net Banking</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;