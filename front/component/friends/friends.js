'use client'
import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt,FaSearch} from 'react-icons/fa'
import { useState,useEffect } from 'react';
import { getCookie } from '../function/function';
import api from '../api/api.js';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

const ConnectedFriends = () => {

	const [searchFriend,setSearchFriend]=useState('');
	const [friends,setFriends]=useState([]);
	const [filterFriends,setFilterFriends]=useState([]);


	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	// console.log(userid);



	const getFriend=async ()=>{

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
	
		  console.log(response)
		setFriends(response.data);
	    setFilterFriends(response.data);
	 
		} catch (error) {
	   
	  console.log(error)
	 }	  
	   }
	
	 useEffect(()=>{
		getFriend();
	 },[])

	 useEffect(() => {
		if (searchFriend.trim() === '') {
		  setFilterFriends(friends);
		} else {
		  const filteredArray = friends.filter(item => ((userid == item.user[0]._id)? item.user[1].name : item.user[0].name)
		  .toLowerCase().includes(searchFriend.toLowerCase()));

		  setFilterFriends(filteredArray);
		}
	  }, [searchFriend]);

  	return (
    		<div className={styles.connectedFriends}>
      			<div className={styles.friendsContainer2}>
        				<div className={styles.friends}>
						{
								friends&&(
									filterFriends.map((frn,index)=>(
										<div className={styles.frameParent} key={index}>
										<div className={styles.ellipseParent}>
											  <div className={styles.frameChild} >
												
											<FaUserAlt className={styles.iconPerson5}/>
											</div>
										</div>
										{
                                          userid==frn.user[0]._id?
										  (
											<>
											<b className={styles.nirojThapa}>{frn.user[1].name}</b>
				
											<BsFillChatLeftTextFill className={styles.vectorIcon} />
											<BsCameraVideoFill className={styles.iconVideo5} />
											</>
										  ):(
                                             <>
                                               	<b className={styles.nirojThapa}>{frn.user[0].name}</b>
				
													<BsFillChatLeftTextFill className={styles.vectorIcon} />
													<BsCameraVideoFill className={styles.iconVideo5} />
												</>
										  )

										}
								  </div>
									)
									))}
        				</div>
      			</div>
      			<img className={styles.connectedFriendsChild} alt="" src="Rectangle 4.svg" />
      			<div className={styles.searchBox}>
					
						<input
						 type='text'
						 id='searchFriend'
						 placeholder='Search friends...'
						 className={styles.searchFriend}
						 value={searchFriend}
						 onChange={(e)=>setSearchFriend(e.target.value)}
						/>
					
						<FaSearch className={styles.iconMagnifyingGlass1}/>
      			</div>
    		</div>);
};

export default ConnectedFriends;
