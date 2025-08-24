import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    open: false,
    emails: null,
    selectedEmail:null,
    searchText: "",
    authUser:null
  },
  reducers: { //actions hote h isme multiple
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    }
  }
});

export const {  
  setOpen,                 
  setEmails,                 
  setSelectedEmail, 
  setSearchText, 
  setAuthUser 
} = appSlice.actions;
export default appSlice.reducer;
