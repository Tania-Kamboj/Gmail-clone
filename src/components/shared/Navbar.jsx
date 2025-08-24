import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoSettingsOutline, IoApps } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setAuthUser } from '../../redux/appSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.appSlice || {});

  const signOutHandler = () => {
    signOut(auth)
      .then(() => dispatch(setAuthUser(null)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search, dispatch]);

  return (
    <div className="flex items-center justify-between px-3 py-2 h-16 w-full max-w-full">
      
      {/* LEFT - Hamburger + Logo */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-[140px]">
        <div className="p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <GiHamburgerMenu size={22} />
        </div>
        <img
          className="w-6 sm:w-8"
          src={"https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"}
          alt="gmail logo"
        />
        <h1 className="hidden sm:block text-lg sm:text-2xl text-gray-500 font-medium truncate">
          Gmail
        </h1>
      </div>
      
      {/* CENTER - Searchbar */}
      <div className="flex-grow max-w-lg mx-4 hidden md:flex">
        <div className="flex items-center bg-[#EAF1FB] px-3 py-2 rounded-full w-full">
          <IoMdSearch size={20} className="text-gray-700" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Mail"
            className="bg-transparent outline-none border-none ml-2 w-full text-sm sm:text-base"
          />
        </div>
      </div>
      
      {/* RIGHT - Icons + Profile */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-[160px] justify-end">
        
        {/* Help/Settings/Gemini: hidden below md */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <FaRegQuestionCircle size={20} />
          </div>
          <div className="p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoSettingsOutline size={20} />
          </div>
          <div className="p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <SiGooglegemini size={20} />
          </div>
        </div>
        
        {/* Google apps icon shown on small+ screens */}
        <div className="hidden sm:block p-2 sm:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <IoApps size={20} />
        </div>
        
        {/* Avatar always visible */}
        <div className="relative p-1 sm:p-2 md:p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <Avatar
            onClick={() => setToggle(!toggle)}
            src={authUser?.photoURL}
            name={authUser?.displayName || 'user'}
            size={36}
            round={true}
          />
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="absolute right-2 z-20 shadow-lg bg-white rounded-md"
              >
                <p onClick={signOutHandler} className="p-4 underline cursor-pointer">
                  LogOut
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
