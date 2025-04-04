import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const token = useAppSelector(selectCurrentToken);
  const { role } = useParams();
  let user;

  if (token) {
    user = verifyToken(token);
  }

  

  const userPaths = [
    { path: `/dashboard/${role}/userDashboard`, element: "Dashboard" },

    { path: `/dashboard/${role}/createBlog`, element: "Create Blog" },
    { path: `/dashboard/${role}/CreateReview`, element: "Create Review" },
    { path: `/dashboard/${role}/myBlog`, element: "My Blog" },
    { path: `/dashboard/${role}/userProfile`, element: "Profile" },
    { path: `/`, element: "Home" },
  ];

  const paths:any = (user as TUser)?.role === "user" && userPaths;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 xl:w-64 lg:w-48 md:w-48 bg-[#fb5770] text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-center">{(role as string).toUpperCase()} Dashboard</h2>
            {/* Close Button */}
            <button
              className="text-2xl text-white lg:hidden"
              onClick={toggleDrawer}
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            { paths?.map((item:any, index:any) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-[#fb5770] font-semibold px-4 py-2 rounded-md"
                    : "hover:bg-white hover:text-[#fb5770] transition-all px-4 py-2 rounded-md"
                }
                onClick={closeDrawer} // Close the drawer when clicking a link
              >
                {item.element}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 ml-0 transition-all md:p-6 lg:ml-64">
        {/* Menu Button for Small Screens */}
        <button
          className="lg:hidden fixed top-4 left-4 text-3xl text-[#fb5770] z-50"
          onClick={toggleDrawer}
        >
          <FaBars />
        </button>

        {/* Content Area */}
        <div className="min-h-screen p-6 bg-white rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
