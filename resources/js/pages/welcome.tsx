// import { Link } from "@inertiajs/react";
// import React, { useState } from "react";

// interface Product {
//     id: number;
//     nama: string;
//     harga: string;
//     img: string;
// }

// interface User {
//     name: string;
//     email: string;
//     avatar?: string;
// }

// interface WelcomePageProps {
//     popularFoods: Product[];
//     auth?: {
//         user?: User;
//     };
// }

// const WelcomePage: React.FC<WelcomePageProps> = ({ popularFoods, auth }) => {
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const user = auth?.user;

//     return (
//         <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
//             {/* PROFESSIONAL NAVBAR */}
//             <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-16">
//                         {/* Logo & Brand */}
//                         <div className="flex items-center space-x-3">
//                             <div className="flex items-center space-x-2">
//                                 <img
//                                     src="/storage/assets/logo.png"
//                                     alt="SA Market Logo"
//                                     className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-sm"
//                                 />
//                                 <div className="flex flex-col">
//                                     <h1 className="font-bold text-base sm:text-lg text-gray-900 leading-tight">SA Market</h1>
//                                     <p className="text-xs text-gray-500 leading-tight hidden sm:block">서울예술고등학교</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Desktop Navigation Menu */}
//                         <div className="hidden md:flex items-center space-x-8">
//                             <Link
//                                 href="/"
//                                 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
//                             >
//                                 Home
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
//                             </Link>
//                             <Link
//                                 href="/menu"
//                                 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
//                             >
//                                 Menu
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
//                             </Link>
//                             <Link
//                                 href="/categories"
//                                 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
//                             >
//                                 Category
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
//                             </Link>
//                             <Link
//                                 href="/contact"
//                                 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
//                             >
//                                 Contact
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
//                             </Link>
//                         </div>

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                             className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition duration-200"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>

//                         {/* Right Side - Auth Section */}
//                         <div className="hidden md:flex items-center space-x-4">
//                             {/* Cart Icon */}
//                             <button className="relative p-2 text-gray-600 hover:text-blue-600 transition duration-200">
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </button>

//                             {/* User Auth Section */}
//                             {user ? (
//                                 /* Logged In State */
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setIsProfileOpen(!isProfileOpen)}
//                                         className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition duration-200 border border-gray-200"
//                                     >
//                                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
//                                             {user.avatar ? (
//                                                 <img
//                                                     src={user.avatar}
//                                                     alt={user.name || 'User'}
//                                                     className="w-8 h-8 rounded-full object-cover"
//                                                 />
//                                             ) : (
//                                                 user.name?.charAt(0).toUpperCase() || 'U'
//                                             )}
//                                         </div>
//                                         <div className="hidden sm:block text-left">
//                                             <p className="text-sm font-medium text-gray-900 leading-tight">{user.name}</p>
//                                             <p className="text-xs text-gray-500 leading-tight">Student</p>
//                                         </div>
//                                         <svg
//                                             className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </button>

//                                     {/* Dropdown Menu */}
//                                     {isProfileOpen && (
//                                         <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
//                                             <div className="px-4 py-3 border-b border-gray-100">
//                                                 <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                                                 <p className="text-sm text-gray-500 truncate">{user.email}</p>
//                                             </div>

//                                             <div className="py-2">
//                                                 <Link
//                                                     href="/dashboard"
//                                                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
//                                                 >
//                                                     <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                                                     </svg>
//                                                     Dashboard
//                                                 </Link>
//                                                 <Link
//                                                     href="/orders"
//                                                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
//                                                 >
//                                                     <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                                                     </svg>
//                                                     My Orders
//                                                 </Link>
//                                                 <Link
//                                                     href="/profile"
//                                                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
//                                                 >
//                                                     <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                     </svg>
//                                                     Profile Settings
//                                                 </Link>
//                                             </div>

//                                             <div className="border-t border-gray-100 pt-2">
//                                                 <Link
//                                                     href="/logout"
//                                                     method="post"
//                                                     className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
//                                                 >
//                                                     <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                                     </svg>
//                                                     Sign Out
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 /* Logged Out State */
//                                 <div className="flex items-center space-x-3">
//                                     <Link
//                                         href="/login"
//                                         className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
//                                     >
//                                         Sign In
//                                     </Link>
//                                     {/* <Link
//                                         href="/register"
//                                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 sm:px-6 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base"
//                                     >
//                                         Get Started
//                                     </Link> */}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Mobile Navigation Menu */}
//                     {isMobileMenuOpen && (
//                         <div className="md:hidden bg-white border-t border-gray-200 py-4">
//                             <div className="flex flex-col space-y-4">
//                                 <Link
//                                     href="/"
//                                     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     Home
//                                 </Link>
//                                 <Link
//                                     href="/menu"
//                                     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     Menu
//                                 </Link>
//                                 <Link
//                                     href="/categories"
//                                     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     Category
//                                 </Link>
//                                 <Link
//                                     href="/contact"
//                                     className="text-gray-700 hover:text-blue-600 font-medium transition duration-200 px-4 py-2"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     Contact
//                                 </Link>

//                                 {/* Mobile Auth Buttons */}
//                                 {!user && (
//                                     <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
//                                         <Link
//                                             href="/login"
//                                             className="text-center bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                         >
//                                             Sign In
//                                         </Link>
//                                         <Link
//                                             href="/register"
//                                             className="text-center bg-gray-100 text-gray-700 font-medium py-2 rounded-lg transition duration-200"
//                                             onClick={() => setIsMobileMenuOpen(false)}
//                                         >
//                                             Get Started
//                                         </Link>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </nav>

//             {/* HERO SECTION */}
//             <section className="w-full bg-white overflow-hidden shadow-lg">
//                 <div className="relative">
//                     <img
//                         src="/storage/assets/kimchi.png"
//                         alt="Korean Food Banner"
//                         className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
//                     />
//                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/30 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-40">
//                         <div className="max-w-md text-white">
//                             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Welcome to SA Market!</h2>
//                             <p className="text-xs sm:text-sm md:text-base leading-relaxed">
//                                 Temukan makanan dan minuman favorit kamu setiap hari. Pesan lebih cepat via WhatsApp,
//                                 antrian lebih cepat ^^
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* POPULAR PRODUCTS SECTION */}
//             <section className="mt-6 sm:mt-8 md:mt-10 mx-auto w-full px-3 sm:px-4 md:px-6 flex-1 max-w-7xl">
//                 <div className="flex items-center justify-between mb-4 sm:mb-6">
//                     <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Produk Terpopuler</h3>
//                     <span className="text-xs sm:text-sm text-white bg-yellow-600 px-2 sm:px-3 py-1 rounded-full">
//                         Banyak diminati!
//                     </span>
//                 </div>

//                 <div className="bg-[#D9A84E] p-3 sm:p-4 rounded-xl shadow-lg">
//                     <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-yellow-200">
//                         {popularFoods.length > 0 ? (
//                             popularFoods.map((item) => (
//                                 <div
//                                     key={item.id}
//                                     className="bg-white text-black rounded-lg shadow-md w-32 sm:w-36 md:w-40 flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                                 >
//                                     <div className="relative">
//                                         <img
//                                             src={item.img}
//                                             alt={item.nama}
//                                             className="w-full h-24 sm:h-28 object-cover rounded-t-lg"
//                                             onError={(e) => {
//                                                 e.currentTarget.src = '/storage/assets/default-product.jpg';
//                                             }}
//                                         />
//                                         <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
//                                             Hot
//                                         </div>
//                                     </div>
//                                     <div className="p-2 sm:p-3">
//                                         <h4 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1">{item.nama}</h4>
//                                         <p className="text-blue-600 text-xs sm:text-sm font-bold mb-2 sm:mb-3">{item.harga}</p>

//                                         {/* Primary Action */}
//                                         <button className="w-full bg-[#075E54] text-white py-1.5 sm:py-2 rounded text-xs font-medium hover:bg-[#128C7E] transition duration-200 shadow-md hover:shadow-lg mb-1.5 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2">
//                                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
//                                                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.453"/>
//                                             </svg>
//                                             Pesan Sekarang
//                                         </button>

//                                         {/* Secondary Action */}
//                                         <button className="w-full bg-transparent text-blue-600 py-1 sm:py-1.5 rounded text-xs hover:bg-blue-50 transition duration-200 border border-blue-200">
//                                             Lihat Detail
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="w-full text-center py-6 sm:py-8">
//                                 <p className="text-gray-600 text-sm sm:text-base">Sedang tidak ada produk populer</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* INFO SECTION */}
//                 <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                     <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
//                         <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-xs sm:text-sm">🚚</span>
//                             </div>
//                             <h4 className="font-semibold text-sm sm:text-base">Gratis Ongkir</h4>
//                         </div>
//                         <p className="text-gray-600 text-xs sm:text-sm">Area sekolah gratis ongkir untuk pembelian di atas ₩10.000</p>
//                     </div>

//                     <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
//                         <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-xs sm:text-sm">⏰</span>
//                             </div>
//                             <h4 className="font-semibold text-sm sm:text-base">Cepat Saji</h4>
//                         </div>
//                         <p className="text-gray-600 text-xs sm:text-sm">Pesanan diproses maksimal 15 menit, ready to eat!</p>
//                     </div>

//                     <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
//                         <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-xs sm:text-sm">💬</span>
//                             </div>
//                             <h4 className="font-semibold text-sm sm:text-base">WhatsApp Order</h4>
//                         </div>
//                         <p className="text-gray-600 text-xs sm:text-sm">Pesan via WhatsApp, lebih praktis dan cepat responnya</p>
//                     </div>
//                 </div>
//             </section>

//             {/* FOOTER */}
//             <footer className="bg-gray-900 text-white mt-8 sm:mt-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//                         {/* Store Info */}
//                         <div className="space-y-3 sm:space-y-4">
//                             <div className="flex items-center gap-2">
//                                 <img
//                                     src="/storage/assets/logo.png"
//                                     alt="SA Market Logo"
//                                     className="w-6 h-6 sm:w-8 sm:h-8"
//                                 />
//                                 <h3 className="text-lg sm:text-xl font-bold">SA Market</h3>
//                             </div>
//                             <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
//                                 Toko makanan Korea terpercaya di Seoul Arts High School.
//                                 Menyediakan berbagai kebutuhan makanan dan minuman dengan kualitas terbaik.
//                             </p>
//                             <div className="flex gap-4">
//                                 <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-200">
//                                     <span className="flex items-center gap-1">
//                                         <span className="text-sm">📷</span>
//                                         <span className="text-xs sm:text-sm">@samarket_official</span>
//                                     </span>
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Contact Info */}
//                         <div className="space-y-3 sm:space-y-4">
//                             <h4 className="font-semibold text-base sm:text-lg">Kontak Kami</h4>
//                             <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-gray-400">📍</span>
//                                     <span>Gedung A, Lantai 1<br />Seoul Arts High School, Seoul</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-gray-400">📞</span>
//                                     <span>+82 10-1234-5678</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-gray-400">✉️</span>
//                                     <span>hello@samarket.co.kr</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Operating Hours */}
//                         <div className="space-y-3 sm:space-y-4">
//                             <h4 className="font-semibold text-base sm:text-lg">Jam Operasional</h4>
//                             <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
//                                 <div className="flex justify-between">
//                                     <span>Senin - Jumat</span>
//                                     <span>07:00 - 17:00</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Sabtu</span>
//                                     <span>08:00 - 15:00</span>
//                                 </div>
//                                 <div className="flex justify-between text-gray-400">
//                                     <span>Minggu</span>
//                                     <span>Libur</span>
//                                 </div>
//                             </div>
//                             <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 sm:p-3">
//                                 <p className="text-xs text-yellow-200">
//                                     💡 <strong>Tips:</strong> Pesan via WhatsApp sebelum jam istirahat untuk menghindari antrian!
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom Footer */}
//                     <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center">
//                         <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
//                             © 2024 SA Market. All rights reserved.
//                         </p>
//                         <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-0">
//                             <a href="#" className="text-gray-400 hover:text-white transition duration-200 text-xs sm:text-sm">
//                                 Kebijakan Privasi
//                             </a>
//                             <a href="#" className="text-gray-400 hover:text-white transition duration-200 text-xs sm:text-sm">
//                                 Syarat & Ketentuan
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default WelcomePage;
