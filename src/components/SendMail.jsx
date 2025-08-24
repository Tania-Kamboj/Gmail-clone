import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { open } = useSelector((store) => store.appSlice);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "emails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    })
    dispatch(setOpen(false));
    setFormData({ 
      to: '', 
      subject: '', 
      message: '' 
    }); // Reset form after submission
  };

  return (
    <div className={`${open ? 'block' : 'hidden'} fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50
      bg-white shadow-xl shadow-slate-600 rounded-t-md w-full max-w-md sm:max-w-lg md:max-w-xl`}>
      <div className='flex items-center justify-between bg-[#f2f6fc] px-4 py-2 rounded-t-md'>
        <h1 className="text-lg font-semibold">New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
          <RxCross2 size={20} />
        </div>
      </div>
      <form onSubmit={submitHandler} className='flex flex-col gap-3 px-4 py-4'>
        <input
          value={formData.to}
          onChange={changeHandler}
          type="text"
          name='to'
          placeholder='To'
          className='outline-none border-b border-gray-300 pb-1 text-sm sm:text-base'
          required
        />
        <input
          value={formData.subject}
          onChange={changeHandler}
          type="text"
          name='subject'
          placeholder='Subject'
          className='outline-none border-b border-gray-300 pb-1 text-sm sm:text-base'
          required
        />
        <textarea
          value={formData.message}
          onChange={changeHandler}
          name='message'
          placeholder='Message'
          rows={6}
          className='outline-none resize-y border-b border-gray-300 pb-1 text-sm sm:text-base'
          required
        />
        <button
          type='submit'
          className='self-start rounded-full px-6 py-2 text-white font-medium bg-[#0b57d0] hover:bg-[#083e96] transition'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMail;