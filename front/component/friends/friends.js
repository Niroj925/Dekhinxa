'use client'
import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt,FaSearch} from 'react-icons/fa'
import { useState,useEffect } from 'react';
import { getCookie } from '../function/function';
import { useRouter } from 'next/navigation';
import api from '../api/api.js';
import {useSelector,useDispatch} from 'react-redux';
import { setActiveComponent,setActiveFriend } from '@/app/redux/slicers/activeFriendSlice';
import io from 'socket.io-client';

const ENDPOINT=process.env.BACKEND_API
var socket;


const ConnectedFriends = () => {

	const [searchFriend,setSearchFriend]=useState('');
	const [friends,setFriends]=useState([]);
	const [filterFriends,setFilterFriends]=useState([]);
	const[socketConnected,setSocketConnected]=useState([]);
    const [loggedInUsers,setLoggedInUsers]=useState([]);

	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	const dispatch=useDispatch();

	useEffect(()=>{

		socket=io(ENDPOINT);
		socket.emit('setup',userid);
		// socket.on('connected',()=>setSocketConnected(true));
        
	  },[userid])
    
	// console.log(userid);

    const router=useRouter();


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
	
		//   console.log(response)
		setFriends(response.data);
	    setFilterFriends(response.data);
		response.status==200? "":(router.push('/login'));
	 
		} catch (error) {
	   router.push('/login');
	  console.log(error)
	 }	  
	//  console.log('socket connected');

	 socket.on('user list', (users) => {
	
		// console.log('response from websocket')
		// console.log(users)
		setLoggedInUsers(users);
		// console.log("logged in users");
		// console.log(loggedInUsers);
	  });
	   }
	
	 useEffect(()=>{
		getFriend();
	 },[loggedInUsers,userid])

	 useEffect(() => {
		if (searchFriend.trim() === '') {
		  setFilterFriends(friends);
		} else {
		  const filteredArray = friends.filter(item => ((userid == item.user[0]._id)? item.user[1].name : item.user[0].name)
		  .toLowerCase().includes(searchFriend.toLowerCase()));

		  setFilterFriends(filteredArray);
		}
	  }, [searchFriend]);

	  const handleChat=(frn)=>{
		dispatch(setActiveComponent('chatbox'));
		dispatch(setActiveFriend(frn));
	  }

	  const handleVideo=(frn)=>{
		dispatch(setActiveComponent('videoCall'));
		dispatch(setActiveFriend(frn));
	  }

  	return (
    		<div className={styles.connectedFriends}>
      			<div className={styles.friendsContainer2}>
        				<div className={styles.friends}>
						{
								friends&&(
									filterFriends.map((frn,index)=>(
										<div className={styles.frameParent} key={index}>
										<div className={ loggedInUsers.includes((userid==frn.user[0]._id)?frn.user[1]._id:frn.user[0]._id)
											?styles.ellipseParentCircle:styles.ellipseParent}>
											{/* <div className={styles.ellipseParentCircle}> */}
											  <div className={styles.frameChild} >
												
											<FaUserAlt className={styles.iconPerson5}/>
											</div>
										</div>
										{
                                          userid==frn.user[0]._id?
										  (
											<b className={styles.nirojThapa}>{frn.user[1].name}</b>
										  ):(
                                               	<b className={styles.nirojThapa}>{frn.user[0].name}</b>
										  )
										}
										<BsFillChatLeftTextFill className={styles.vectorIcon} onClick={()=>handleChat(frn)}/>
										<BsCameraVideoFill className={styles.iconVideo5} onClick={()=>handleVideo(frn)} />
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
