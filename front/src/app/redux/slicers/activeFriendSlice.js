'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState={
    activeFriend:null,
    activeComponent:'friends'
}

export const activeFriendSlice=createSlice({
    name:'friend',
    initialState,
    reducers:{
        setActiveFriend:(state,action)=>{
            state.activeFriend=action.payload;
        },
        setActiveComponent:(state,action)=>{
            state.activeComponent=action.payload;
        },
        logout: (state) => {
            state.activeFriend = null;
            state.activeComponent = 'friends';
          },
    }
});

export const {setActiveFriend,setActiveComponent,logout}=activeFriendSlice.actions;

export default activeFriendSlice.reducer;