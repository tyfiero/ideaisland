// import React from "react";
// import { FaBug } from "react-icons/fa";

// function FullSidebar() {
//   const [isToggled, setIsToggled] = React.useState(false);

//   return (
//     <div>

// <div className="flex flex-row min-h-screen bg-gray-100">
//   <div className="flex flex-col w-56 overflow-hidden bg-slate-300 rounded-r-3xl">
//     <div className="flex items-center justify-center h-20 shadow-md">
//       <h1 className="text-3xl text-indigo-500 uppercase">Logo</h1>
//     </div>
//     <ul className="flex flex-col py-4">
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
//           <span className="text-sm font-medium">Dashboard</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
//           <span className="text-sm font-medium">Music</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
//           <span className="text-sm font-medium">Drink</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
//           <span className="text-sm font-medium">Shopping</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
//           <span className="text-sm font-medium">Chat</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-user"></i></span>
//           <span className="text-sm font-medium">Profile</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
//           <span className="text-sm font-medium">Notifications</span>
//           <span className="px-3 py-px ml-auto mr-6 text-sm text-red-500 bg-red-100 rounded-full">5</span>
//         </a>
//       </li>
//       <li>
//         <a href="#" className="flex flex-row items-center h-12 text-gray-500 transition-transform duration-200 ease-in transform hover:translate-x-2 hover:text-gray-800">
//           <span className="inline-flex items-center justify-center w-12 h-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
//           <span className="text-sm font-medium">Logout</span>
//         </a>
//       </li>
//     </ul>
//   </div>
// </div>







// {/* 
        
//       <div classNameName="flex-col w-full md:flex md:flex-row md:min-h-screen">
//         <div
//           onClick={() => setIsToggled(false)}
//           classNameName="flex flex-col flex-shrink-0 w-full text-gray-700 bg-slate-400 md:w-64 dark-mode:text-gray-200 dark-mode:bg-gray-800"
//           x-data="{ open: false }"
//         >
//           <div classNameName="flex flex-row items-center justify-between flex-shrink-0 px-8 py-4">
//             <a
//               href="#"
//               classNameName="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
//             >
//           <img
//             src="/bulb.svg"
//             alt="logo"
//             classNameName="h-16 pl-3 pr-1 mt-2 transition cursor-pointer w-a hover:scale-105"
//             // onClick={() => {
//             //   console.log("clicked logo");
//             // }}
//           />
//               ideaisland
//             </a>

//             <button
//               classNameName="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
//               onClick={() => setIsToggled(!isToggled)}
//             >
//               <FaBug />
//             </button>
//           </div>
//           <nav
//             onClick={() => setIsToggled(!isToggled)}
//             classNameName="flex-grow px-4 pb-4 md:block md:pb-0 md:overflow-y-auto"
//           >
//             <a
//               classNameName="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//               href="#"
//             >
//               Blog
//             </a>

//             <a
//               classNameName="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//               href="#"
//             >
//               Portfolio
//             </a>

//             <a
//               classNameName="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//               href="#"
//             >
//               About
//             </a>
//             <a
//               classNameName="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//               href="#"
//             >
//               Contact
//             </a>
//             <div
//               onClick={() => setIsToggled(!isToggled)}
//               classNameName="relative"
//               x-data="{ open: false }"
//             >
//               <button
//                 onClick={() => setIsToggled(!isToggled)}
//                 classNameName="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//               >
//                 <span>Dropdown</span>
//                 <FaBug />
//               </button>
//               <div
//                 //  x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95"

//                 classNameName="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg"
//               >
//                 <div classNameName="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
//                   <a
//                     classNameName="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                     href="#"
//                   >
//                     Link #1
//                   </a>
//                   <a
//                     classNameName="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                     href="#"
//                   >
//                     Link #2
//                   </a>
//                   <a
//                     classNameName="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                     href="#"
//                   >
//                     Link #3
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default FullSidebar;
