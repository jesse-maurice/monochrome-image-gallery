import React, {
  useEffect,
  useState,
} from 'react';

import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { auth } from '../firebase';
import imageList from '../server/images.json';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(require.context('../assets/images', false, /\.(webp|jpe?g|svg)$/));
;



const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredImages, setFilteredImages] = useState(imageList);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDotDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Filter images based on searchValue
    const filtered = imageList
      .filter((image) =>
        image.tag.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
      .map((image) => ({
        ...image,
        src: images[image.src], // Update the src to the imported image
      }));
    setFilteredImages(shuffleArray(filtered));
  }, [searchValue]);

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/SignUp");
  };

  return (
    <>
      <div className="z-10 flex flex-row items-center content-center justify-between w-full border-box px-44 max-sm:px-4 md:px-10 lg:px-10 xl:px-10 2xl:px-44">
        <h1 className="font-high text-[50px] max-sm:text-[40px] text-[#ffffff]">
          m
        </h1>
        <div className="flex items-center font-sans lg:gap-8 2xl:gap-8 max-sm:gap-3 md:gap-4">
          <div
            className="relative flex items-center gap-2 max-sm:hidden md:hidden lg:inline-flex 2xl:inline-flex"
            onClick={toggleExploreDropdown}
          >
            <p className="text-lg text-white cursor-pointer hover:text-gray-300">
              Explore
            </p>
            <i
              className={`fa-solid fa-angle-down fa-xs mt-1 cursor-pointer ${
                isExploreOpen ? "rotate-180" : ""
              }`}
              style={{ color: "#ffffff" }}
            ></i>
            {isExploreOpen && (
              <div className="absolute z-20 bg-white rounded-lg shadow-lg -right-6 top-12 w-44">
                <div className="tooltip-arrow"></div>
                <div className="flex flex-col w-full py-2 font-sans font-medium">
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Discover Photos
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Popular searches
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Leaderboard
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Challenges
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Blog
                  </a>
                </div>
              </div>
            )}
          </div>
          <p className="text-lg text-white cursor-pointer max-sm:hidden md:hidden lg:inline-flex 2xl:inline-flex hover:text-gray-300">
            Upload
          </p>
          <div className="relative max-sm:hidden md:hidden lg:inline-flex 2xl:inline-flex">
            <i
              className="text-white cursor-pointer fa-solid fa-ellipsis"
              style={{ color: "#ffffff" }}
              onClick={toggleDotDropdown}
            ></i>
            {isOpen && (
              <div className="absolute z-20 mt-10 bg-white rounded-lg shadow-lg -right-6 w-44">
                <div className="tooltip-arrow"></div>
                <div className="flex flex-col w-full py-2 font-sans font-medium">
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </a>
                  <div className="w-full h-[1px] bg-gray-100"></div>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Join
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Image & Video API
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    FAQ
                  </a>
                  <a
                    href="/"
                    className="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Partnerships
                  </a>
                  <div className="w-full h-[1px] bg-gray-100"></div>
                  <div className="flex items-center w-full gap-4 px-4 py-2">
                    <a
                      target="_blank"
                      href="https://twitter.com/i_am_monochrome"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/i.am.monochrome/"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to={user ? "/" : "/SignUp"}>
            <button
              className={`bg-[#ef5350] flex items-center justify-center text-white tracking-wider px-[16px] font-light outline-none border-none max-sm:py-[7px] max-sm:px-[20px] max-sm:text-base md:text-lg transition ease-in delay-150 hover:translate-y-1 hover:scale-40 hover:bg-[#ef5350] duration-300 py-[10px] rounded-lg`}
              type="submit"
              onClick={user ? handleLogout : null}
            >
              {user ? "Sign Out" : "Join"}
            </button>
          </Link>
          <i
            className="fa-solid fa-bars fa-lg lg:hidden 2xl:hidden"
            style={{ color: "#ffffff" }}
            onClick={toggleNavMenu}
          ></i>
          {isNavOpen && (
            <div className="fixed inset-0 z-50 bg-black">
              <nav className="fixed top-0 left-0 flex flex-col items-start w-full h-full px-5 ">
                <div className="flex items-center w-full gap-4 ">
                  <h1 className="font-high text-[50px] max-sm:text-[40px] text-[#ffffff]">
                    m
                  </h1>
                  <form className="w-full max-sm:max-w-[300px] lg:max-w-lg md:max-w-2xl">
                    <div className="relative flex items-center">
                      <i className="fa-solid absolute w-[5px] h-[5px] pointer-events-none ml-3 fa-magnifying-glass fa-beat-fade"></i>
                      <input
                        type="text"
                        name="search"
                        placeholder="Search Images..."
                        autoComplete="off"
                        className="w-full px-3 py-[4px] md:py-[7px] mt-3 pl-10 font-medium placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 font-sans"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className=" w-full h-[0.2px] mt-3 bg-gray-700"></div>
                <ul className="flex flex-col items-start font-sans text-xl font-medium text-white ">
                  <li className="py-2 mt-4 hover:text-gray-300">
                    <a href="/">Home</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Discover Photos</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Popular Searches</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Free Videos</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Challenges</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Blog</a>
                  </li>
                </ul>
                <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                <ul className="flex flex-col items-start font-sans text-xl font-medium text-white">
                  <li className="py-2 mt-6 hover:text-gray-300">
                    <a href="/">Login</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">Join</a>
                  </li>
                </ul>
                <div className=" w-full h-[0.2px] mt-6 bg-gray-700"></div>
                <ul className="flex flex-col items-start font-sans text-xl font-medium text-white">
                  <li className="py-2 mt-6 hover:text-gray-300">
                    <a href="/">FAQ</a>
                  </li>
                  <li className="py-2 hover:text-gray-300">
                    <a href="/">About Us</a>
                  </li>
                </ul>
                <div className=" w-full h-[0.2px] my-6 bg-gray-700"></div>
                <div className="flex items-center w-full gap-10">
                  <a
                    target="_blank"
                    href="https://twitter.com/i_am_monochrome"
                    rel="noreferrer"
                  >
                    <i
                      className="fa-brands fa-x-twitter fa-2xl"
                      style={{ color: "#ffffff" }}
                    ></i>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/i.am.monochrome/"
                    rel="noreferrer"
                  >
                    <i
                      className="fa-brands fa-instagram fa-2xl"
                      style={{ color: "#ffffff" }}
                    ></i>
                  </a>
                </div>
                <button
                  className="absolute p-4 right-1 top-2 md:top-4"
                  onClick={toggleNavMenu}
                >
                  <i className="text-white fas fa-times fa-xl"></i>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
