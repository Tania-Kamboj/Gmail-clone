import React, { useEffect, useState } from 'react'
import Message from './Message';
import { orderBy, collection, query, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {db} from '../firebase';
import { setEmails } from '../redux/appSlice';


const Messages = () => {
  const {searchText, emails} = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState(emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      dispatch(setEmails(allEmails));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filteredEmails = emails?.filter((email) => {
      return email?.subject?.toLowerCase().includes(searchText.toLowerCase())
      || email?.to?.toLowerCase().includes(searchText.toLowerCase())
      || email?.message?.toLowerCase().includes(searchText.toLowerCase());
    });
    setTempEmails(filteredEmails);
  },[searchText, emails]);

  return (
    <div>
        {tempEmails && tempEmails?.map((email) => <Message email = {email} />)}
    </div>
  )
}

export default Messages