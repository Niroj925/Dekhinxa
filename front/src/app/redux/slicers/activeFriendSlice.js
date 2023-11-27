'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState={
    activeFriend:null,
    activeComponent:''
}

export const activeFriendSlice=createSlice({
    name:'activeFriend',
    initialState,
    reducers:{
        setActiveFriend:(state,action)=>{
            state.activeFriend=action.payload;
        },
        setActiveComponent:(state,action)=>{
            state.activeComponent=action.payload;
        }
    }
});

export const {setActiveFriend,setActiveComponent}=activeFriendSlice.actions;

export default activeFriendSlice.reducer;