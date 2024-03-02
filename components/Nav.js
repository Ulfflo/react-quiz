import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { CiApple } from "react-icons/ci";
import AdminModal from "./AdminModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DarkModeButton from "./DarkModeBtn";

const Header = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showModal, setShowModal] = useState(false); // Track login modal visibility

  useEffect(() => {
    // Check if user is already logged in from browser storage on component mount
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []); // Run only once on component mount

  const handleAdminClick = () => {
    // Check if the user is not logged in
    if (!isLoggedIn) {
      setShowModal(true); // Open the login modal
    } else if (router.pathname === "/admin") {
      // If the user is on the admin page, show the logout modal
      setShowModal(true);
    } else {
      // Redirect to the admin page if logged in and not on admin page
      router.push("/admin");
    }
  };

  const handleCloseModal = () => {
    // Close the login modal
    setShowModal(false);
  };

  return (
    <header
      className={`py-4 whitespace-nowrap ${
        darkMode ? "bg-teal-900 text-green-100" : "bg-green-600 text-green-50"
      } `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl ">
          <CiApple />
        </div>
        <div className="my-4 md:mr-10">
          <Link href="/" className=" text-green-50 no-underline">
            <h1 className="text-2xl font-bold">Apple Quiz</h1>
          </Link>
        </div>
        <nav className="flex items-center">
          <DarkModeButton />
          <div className="md:space-x-16 space-x-8 md:text-xl hidden md:flex  ">
            <Link
              href="/"
              className="hover:text-gray-300 text-white no-underline"
            >
              Play
            </Link>

            <button
              onClick={handleAdminClick}
              className="hover:text-gray-300 bg-green-600 border-none text-white no-underline text-xl"
            >
              {isLoggedIn ? "Logout" : "Admin"}
            </button>
          </div>
          <button className="md:hidden text-3xl bg-transparent border-none text-green-50">
            <IoIosMenu />
          </button>
        </nav>
      </div>
      {showModal && (
        <AdminModal
          onClose={handleCloseModal}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </header>
  );
};

export default Header;
