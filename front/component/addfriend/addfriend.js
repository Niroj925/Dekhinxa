'use client'
import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt,FaSearch} from 'react-icons/fa'
import { useState,useEffect } from 'react';
import api from '../api/api.js';
import { getCookie } from '../function/function.js';

const ConnectedFriends = () => {

	const [searchFriend,setSearchFriend]=useState('');
    const [myFriends,setMyFriends]=useState([]);
	const [friends,setFriends]=useState([]);

	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	const getFriends= async () => {

		const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));
		// console.log(token);

		if(token == null || token == 'undefine'){
			router.push('/login');
		}else{
		try {
		  const response = await api.get(
			`/api/user?search=${searchFriend}`,
			{
			  headers: {
				token: token,
			  },
			}
		  );

		//   console.log(response)
	
		  setFriends(response.data);
		  setFilterFriends(response.data);
		 
		} catch (error) {
	   
	  console.log(error)
	 }
   }
   };

  
   const getMyFriend=async ()=>{

	const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));
	// console.log(token);
	try {
	  const response = await api.get(
		`/api/chat`,
		{
		  headers: {
			token: token,
		  },
		}
	  );

	//   console.log('respo:',response.data);
	setMyFriends(response.data);

	} catch (error) {
   
  console.log(error)
 }	  
   }


   const handleSearch=()=>{
	getFriends();
   }

   useEffect(()=>{
	 getFriends();
	 getMyFriend();
   },[])

   const addFriend=async (id)=>{

	const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));
	// console.log(token);
	try {
	  const response = await api.post(
		`/api/chat`,{id},
		{
		  headers: {
			token: token,
		  },
		}
	  );
	//   console.log(response) 
	  if(response){
		getFriends();
	    getMyFriend();
	  }
	} catch (error) { 
  console.log(error)
 }    
}

const isFriend = (friendId) => {
	for (let i = 0; i < myFriends.length; i++) {
	  const users = myFriends[i].user;
  
	  if (users.some(user => user._id === userid)) {
		
		if (users.some(user => user._id === friendId)) {
		  return true; 
		}
	  }
	}
  
	return false; 
  };
    // console.log(isFriend('65609d4c21e22ac0f1bac733'));

  	return (
    		<div className={styles.connectedFriends}>
      			<div className={styles.friendsContainer2}>
        				<div className={styles.friends}>

                            {
								friends&&(
									friends.map((frn,index)=>(
										<div className={styles.frameParent} key={index}>
										<div className={styles.ellipseParent}>
											  <div className={styles.frameChild} >
												
											<FaUserAlt className={styles.iconPerson5}/>
											</div>
										</div>
										<b className={styles.name}>{frn.name}</b>

                                          {
											isFriend(frn._id)?(
												<>

												</>
											):(
												<>
												 <div className={styles.add} onClick={()=>addFriend(frn._id)}>
											<p className={styles.addFriend}> Add Friend </p>
											</div>
												</>
											)
										  }
                                          {/* <div className={styles.add} onClick={()=>addFriend(frn._id)}>
											<p className={styles.addFriend}> Add Friend </p>
											</div> */}
								  </div>
									)
									))}
        				</div>
      			</div>
      			<img className={styles.connectedFriendsChild} alt="" src="Rectangle 4.svg" />
      			<div className={styles.searchBox}>    
						<input
						 type='text'
						 id='friend'
						 placeholder='Search new friends...'
						 className={styles.searchFriend}
						 value={searchFriend}
						 onChange={(e)=>setSearchFriend(e.target.value)}
						/>			
						<FaSearch className={styles.iconMagnifyingGlass1} onClick={handleSearch}/>
      			</div>
    		</div>);
};

export default ConnectedFriends;
