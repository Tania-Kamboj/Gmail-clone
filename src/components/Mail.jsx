import React from 'react'
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import {FaCaretDown} from "react-icons/fa";
import { BiArchiveIn } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {motion} from 'framer-motion';

const Mail = () => {
  const navigate = useNavigate();
  const {selectedEmail} = useSelector((state) => state.appSlice);
  const params = useParams();

  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex-1 bg-white w-full rounded-t-lg mx-5'>
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          <div onClick={() => navigate("/")} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size={20} />
          </div>
          <div className='pl-5 p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <BiArchiveIn size={20} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineReport size={20} />
          </div>
          <div onClick={() => deleteMailById(params.id)} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdDeleteOutline size={20} />
          </div>
          <div className='pl-5 p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineMarkEmailUnread size={20} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineDriveFileMove size={20} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <BsThreeDotsVertical size={20} />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-gray-500 text-sm '>1 of 1000</p>
          <button className='text-gray-500 text-sm hover:rounded-full hover:bg-gray-100 p-2'>
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button className='text-gray-500 text-sm hover:rounded-full hover:bg-gray-100 p-2'>
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className='h-[90vh] overflow-y-auto p-4'>
        <div className='flex items-center justify-between bg-white gap-1'>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl font-medium'>{selectedEmail?.subject}</h1>
            <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
          </div>
          <div className='flex-none text-gray-400 my-5 text-sm'>
            <p>{new Date(selectedEmail?.createdAt?.seconds * 1000).toUTCString()}</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm'>
          <h1>{selectedEmail?.to}</h1>
          <div className='flex items-center'>
            <span>to me</span>
            <FaCaretDown size={15} className='ml-1 rounded-full hover:bg-gray-100 cursor-pointer'/>
          </div>

        </div>
        <div className='my-10 '>
          <p>{selectedEmail?.message}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Mail