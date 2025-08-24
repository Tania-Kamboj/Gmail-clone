import React, { useState } from 'react';
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoTag } from 'react-icons/go';
import { IoMdInformationCircleOutline } from "react-icons/io";
import Messages from './Messages';

const mailType = [
  {
    icon: <MdInbox size={20} />,
    text: "Primary"
  },
  {
    icon: <GoTag size={20} />,
    text: "Promotions"
  },
  {
    icon: <FaUserFriends size={20} />,
    text: "Social"
  },
  {
    icon: <IoMdInformationCircleOutline size={20} />,
    text: "Updates"
  }
]

const Inbox = () => {
  const [mailTypeSelected, setmailTypeSelected] = useState(0);

  return (
    <div className="flex-1 bg-white w-full rounded-t-lg mx-2 sm:mx-5">
      <div className="flex flex-wrap items-center justify-between px-2 py-2 sm:px-4 gap-2">
        {/* Controls */}
        <div className="flex items-center gap-2 text-gray-700">
          <div className="flex items-center gap-1">
            <MdCropSquare size={20} />
            <FaCaretDown size={20} />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoReload size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer hidden xs:inline">
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <p className="text-gray-500 text-xs sm:text-sm hover:bg-gray-100 rounded px-2 py-1">{'1-50 of 1,546'}</p>
          <button className="text-gray-500 text-sm px-1 rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button className="text-gray-500 text-sm px-1 rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
      {/* Tabs row (Primary, Promotions, etc) */}
      <div className="overflow-x-auto w-full border-b border-gray-200">
        <div className="flex min-w-[340px] sm:min-w-0">
          {mailType.map((item, index) => (
            <button
              key={index}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-3 sm:px-4 sm:py-4 
                text-xs sm:text-base w-1/4 max-w-[180px] sm:w-auto border-b-4 font-medium
                ${mailTypeSelected === index ? 'border-b-blue-600 text-blue-600' : 'border-b-transparent text-gray-700'}
                hover:bg-gray-100 transition`}
              onClick={() => setmailTypeSelected(index)}
            >
              {item.icon}
              <span className="whitespace-nowrap">{item.text}</span>
              {item.badge && (
                <span className={`ml-2 px-2 py-1 rounded-full text-white text-[11px] font-semibold ${item.badgeColor}`}>{item.badge} new</span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Messages List */}
      <div className="h-[60vh] sm:h-[75vh] overflow-y-auto">
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;