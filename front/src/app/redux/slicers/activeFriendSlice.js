'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState={
    activeFriend:null,
    activeComponent:'friends',
    roomId:''
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
        setRoomId:(state,action)=>{
           state.roomId=action.payload; 
        },
        logout: (state) => {
            state.activeFriend = null;
            state.activeComponent = 'friends';
          },
    }
});

export const {setActiveFriend,setActiveComponent,setRoomId,logout}=activeFriendSlice.actions;

export default activeFriendSlice.reducer;