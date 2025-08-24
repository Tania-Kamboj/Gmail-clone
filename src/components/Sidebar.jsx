import React from 'react'
import { LuPencil } from "react-icons/lu";
import { MdOutlineInbox, MdOutlineStarBorder} from "react-icons/md";
import { RiSendPlane2Line } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItem = [
    {
        icon: <MdOutlineInbox size={20} />,
        text: "Inbox"
    },
    {
        icon: <MdOutlineStarBorder size={20} />,
        text: "Starred"
    },
    {
        icon: <FaRegClock size={20} />,
        text: "Snoozed"
    },
    {
        icon: <RiSendPlane2Line size={20} />,
        text: "Sent"
    },
    {
        icon: <IoDocumentOutline size={20} />,
        text: "Drafts"
    },
    {
        icon: <IoIosArrowDown size={20} />,
        text: "More"
    }
    
]

const Sidebar = () => {
  // const [Open, setOpen] = useState(false);
  // let open = false;
  const dispatch = useDispatch();
  return (
    // Sidebar container
    <div className="w-[15%] min-w-[200px] bg-[#f7f7fa] h-screen flex flex-col">
      
      {/* Compose button */}
      <div className="p-3">
        <button onClick={() => dispatch(setOpen(true))} className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:shadow-md bg-[#c2e7ff]">
          <LuPencil size={24} />
          Compose
        </button>
      </div>

      {/* Other menu items */}
      <div className="text-gray-700">
        {
            sidebarItem.map((item, index) => {
                return (
                    <div key={index} className="flex items-center gap-4 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200 my-1 w-full">
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                )
            })
        }

      </div>
    </div>
  )
}

export default Sidebar
