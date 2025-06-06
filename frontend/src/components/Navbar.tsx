/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import OutlineButton from "./customButton/OutlineButton";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { TCategory, TUser } from "@/types";
import { toast } from "sonner";
import { useGetAllUserQuery } from "@/redux/features/user/userManagementApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "motion/react"
import { FiChevronDown } from "react-icons/fi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryManagementApi";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewManagementApi";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const navigate = useNavigate();
  const token = useAppSelector(selectCurrentToken);
  const { data: categories } = useGetAllCategoryQuery(undefined)
  const { data: products } = useGetAllReviewsQuery(undefined)
  let user;
  if (token) {
    user = verifyToken(token)
  }

  const { data: currentUser } = useGetAllUserQuery({ email: (user as TUser)?.email })

  


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };



  const navbarLinks = [
    {
      path: '/',
      element: "Home"
    },
    {
      path: '/allReviews',
      element: "Reviews"
    },
    {
      path: '/blogs',
      element: "Blogs"
    },
    {
      path: '/about',
      element: "About"
    },
  ]

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery(""); // Clear input after submission
    }
  };

  // Handle selecting a product from the suggestions
  const handleSelecTReview = (productId: string) => {
    navigate(`/productDetails/${productId}`);
    setQuery(""); // Clear the search input after selection
  };

  // Show suggestions only if there are results
  const filteredProducts = products?.data?.filter((product) =>
    
    product.author.name.toLowerCase().includes(query.toLowerCase())
  );
  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged Out')
    handleNavClick()
    navigate('/')
  }



  return (
    <>
      {/* Desktop Navbar */}
      <div className="sticky top-0 z-40 hidden py-2 bg-white shadow-md lg:block">
        <div className="container flex items-center justify-between px-10 mx-auto navbar">
          {/* Navigation Items */}
          <div className="flex items-center gap-4 font-bold xl:gap-8">
            {navbarLinks?.map((item, index) => (
              <NavLink
                key={index}
                to={item?.path}
                className={({ isActive }) =>
                  `underline-animation ${isActive ? "text-[#fb5770] font-bold text-lg" : "text-lg"
                  }`
                }
              >
                {item?.element}
              </NavLink>
            ))}


            <div className="relative group">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="flex items-center gap-1 py-2 rounded-md transition-all text-lg font-bold hover:text-[#fb5770]"
              >
                Categories <FiChevronDown size={18} />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="absolute z-50 p-6 xl:w-[800px] w-[600px] border rounded-lg shadow-xl -left-2/3 bg-white/10 backdrop-blur-2xl border-white/30"
                >
                  <div>
                    <div>
                      <div>
                        <h2 className="mb-2 text-lg font-bold text-center text-black">
                          Explore Category
                        </h2>
                        <hr />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 xl:grid-cols-3">
                        {categories?.data?.slice(0, 12)?.map((category: TCategory) => (
                          <div key={category?._id}>
                            <Link
                              to={`/allReviews?category=${category?._id}`}
                              className="flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-white/20 hover:text-[#fb5770]"
                            >
                              <img
                                className="rounded-full object-cover w-[40px] h-[40px] shadow-md"
                                src={category?.image}
                                alt={category?.name}
                              />
                              <h2 className="font-medium">{category?.name}</h2>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                 
                  </div>
                </motion.div>
              )}
            </div>

          </div>
          {/* Logo */}
          <Link to={"/"} className="flex items-center">
            <img
              className="w-[50px] h-[50px] object-cover"
              src="https://i.ibb.co.com/DPp2Kx4V/pro-logo.png"
              alt="Logo"
            />
            <h1 className="text-2xl font-criticspot">CriticSpot.</h1>
          </Link>

          




          <div className="relative">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center border-2 border-[#fb5770] rounded-md">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSuggestionsVisible(e.target.value.length > 0); // Show suggestions when query is not empty
                }}
                placeholder="Search..."
                className="flex-grow px-4 py-2 w-[400px] border-none outline-none"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-[#fb5770] text-white hover:bg-[#e04d62]"
              >
                Search
              </button>
            </form>

            {/* Auto-Suggestions Dropdown */}
            {isSuggestionsVisible && query && filteredProducts && filteredProducts.length > 0 && (
              <ul className="absolute w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-48">
                {filteredProducts.map((product) => (
                  <li
                    key={product._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelecTReview(product._id)} // Navigate & clear input
                  >
                    {product.author.name}
                  </li>
                ))}
              </ul>
            )}

            {/* If there are no matching products */}
            {isSuggestionsVisible && query && (!filteredProducts || filteredProducts.length === 0) && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                <p className="px-4 py-2 text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div>
            {
              user && (user as TUser)?.email ? (
                <div className="flex items-center gap-4">
                  <Link to={"/addedFavorites"} className="relative">
                    <img
                      className="w-[30px]"
                      src="https://cdn-icons-png.flaticon.com/512/73/73814.png"
                      alt="Favorite"
                    />
                 
                  </Link>
               

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {currentUser?.data && currentUser.data.length > 0 && (
                        <img className="w-[50] h-[50px] rounded-full" src={currentUser.data[0].photoUrl} alt="User profile" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-4 mr-32 shadow-lg bg-white/10 backdrop-blur-lg">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white" />
                      <div className="flex flex-col gap-4 mt-4">
                        <NavLink
                          to={`/dashboard/${(user as TUser)?.role}/${(user as TUser)?.role}Dashboard`}
                          onClick={handleNavClick}
                          className={({ isActive }) =>
                            `underline-animation text-lg hover:text-white bg-[#fb5770] px-2 py-1 ${isActive ? "text-[#fb5770]" : ""
                            }`
                          }
                        >
                          Dashboard
                        </NavLink>

                        <button
                          onClick={handleLogout}
                          style={{
                            borderRadius: "12px",
                          }}
                          className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:border-white hover:bg-[#fb5770] hover:text-white px-2 rounded-lg h-11 focus:outline-none"
                        >
                          Logout
                        </button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>


                </div>
              ) : (
                <Link to="/login">
                  <OutlineButton text="Submit Review" />
                </Link>
              )
            }
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="relative z-40 lg:hidden">
        {/* Drawer Toggle Button */}
        <button
          onClick={toggleDrawer}
          className="fixed z-50 p-3 bg-[#fb5770] text-white rounded-full top-4 right-4 shadow-md"
        >
          <MdOutlineMenu size={24} />
        </button>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button */}
          <button
            onClick={toggleDrawer}
            className="absolute top-4 left-4 p-3 bg-[#fb5770] text-white rounded-full shadow-md"
          >
            <IoMdCloseCircleOutline size={24} />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col px-6 mt-20 space-y-6 font-bold">

            <div className="relative">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center border-2 border-[#fb5770] rounded-md">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSuggestionsVisible(e.target.value.length > 0); // Show suggestions when query is not empty
                  }}
                  placeholder="Search..."
                  className="flex-grow px-4 py-2 w-[100px] border-none outline-none"
                />
              </form>

              {/* Auto-Suggestions Dropdown */}
              {isSuggestionsVisible && query && filteredProducts && filteredProducts.length > 0 && (
                <ul className="absolute w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-48">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelecTReview(product._id)} // Navigate & clear input
                    >
                      {product.author.name}
                    </li>
                  ))}
                </ul>
              )}

              {/* If there are no matching products */}
              {isSuggestionsVisible && query && (!filteredProducts || filteredProducts.length === 0) && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                  <p className="px-4 py-2 text-gray-500">No products found</p>
                </div>
              )}
            </div>

            {navbarLinks?.map(
              (item, index) => (
                <NavLink
                  key={index}
                  to={item?.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `underline-animation ${isActive ? "text-[#fb5770] font-bold" : ""
                    }`
                  }
                >
                  {item?.element}
                </NavLink>
              )
            )}

            <NavLink
              to='/allCategory'
              onClick={handleNavClick}
              className={({ isActive }) =>
                `underline-animation ${isActive ? "text-[#fb5770] font-bold" : ""
                }`
              }
            >
              Categories
            </NavLink>



            {
              user && (user as TUser)?.email ? (
                <>
                  <Link to={"/addedFavorites"} onClick={handleNavClick} className="relative">
                    <img
                      className="w-[30px]"
                      src="https://cdn-icons-png.flaticon.com/512/73/73814.png"
                      alt="Favorite"
                    />
               
                  </Link>
                  <Link to={"/addedCards"} onClick={handleNavClick} className="relative">
                    <img
                      className="w-[40px]"
                      src="https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
                      alt="Cart"
                    />

                   
                  </Link>
                  <NavLink
                    to={`/dashboard/${(user as TUser)?.role}/${(user as TUser)?.role}Dashboard`}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `underline-animation ${isActive ? "text-[#fb5770] font-bold" : ""
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    style={{
                      borderRadius: "8px",
                    }}
                    className="text-sm font-medium border border-[#fb5770] bg-white text-[#fb5770] hover:bg-[#fb5770] hover:text-white px-4 rounded-lg h-11 focus:outline-none"
                  >
                    Logout
                  </button></>
              ) : (
                <Link to="/login" onClick={handleNavClick}>

                  <OutlineButton text="Submit Review" />
                </Link>
              )
            }
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
