'use client'
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt} from 'react-icons/fa'
import {AiOutlineMenu,AiFillSetting} from 'react-icons/ai'
import {BiUserPlus,BiSolidUserDetail} from 'react-icons/bi'
import {ImCross} from 'react-icons/im';
import {RiFeedbackFill} from 'react-icons/ri';
import api from '../../../component/api/api.js';
import Friends from '../../../component/friends/friends';
import Chatbox from '../../../component/chatbox/chat';
import VideoCall from '../../../component/video/video';
import AddFriend from '../../../component/addfriend/addfriend';
import {useSelector,useDispatch} from 'react-redux';
import { setActiveComponent,logout} from '@/app/redux/slicers/activeFriendSlice';
import io from 'socket.io-client';

const ENDPOINT=process.env.BACKEND_API;
var socket;

const Dashboard = () => {
	
	const [activeIcon, setActiveIcon] = useState('friends');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [username,setUsername]=useState('');
	const [socketConnected,setSocketConnected]=useState(false);
	const [loggedInUsers,setLoggedInUsers]=useState([]);

	const router=useRouter();
	const dispatch=useDispatch();

	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	const activeFriend=useSelector((state)=>state.friend.activeFriend);
    const activeComponent=useSelector((state)=>state.friend.activeComponent);


	console.log(activeFriend);
	// console.log(ActiveComponent);
	console.log(activeComponent);


	useEffect(()=>{
		setActiveIcon(activeComponent);
	},[activeComponent]);

	useEffect(()=>{
		socket=io(ENDPOINT);
		socket.emit('setup',userid);
		socket.on('connected',()=>setSocketConnected(true));
		// socket.on('typing',()=>setIsTyping(true));
		// socket.on('stop typing',()=>setIsTyping(false));
	  },[])

	
	function getCookie(cookieName) {
		const name = cookieName + '=';
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookieArray = decodedCookie.split(';');
	  
		for (let i = 0; i < cookieArray.length; i++) {
		  let cookie = cookieArray[i].trim();
		  if (cookie.indexOf(name) === 0) {
			return cookie.substring(name.length, cookie.length);
		  }
		}
	  
		return null;
	  }

  function deleteCookie(cookieName, path) {
	document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path || '/'};`;
  }
  

	const getUser = async () => {

		   const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));

		// console.log("token:",token);

	if(token == null || token == 'undefine'){
		router.push('/login');
	}else{

		try {
		  const response = await api.get('/api/user/uservalidate',
			{
			  headers: {
				// token: JSON.parse(token),
				token:token
			  },
			}
		  );
	  
		//   console.log(response);
		  const {data}=response
		// console.log('name:',response.data.name);
		setUsername(data.name);
		} catch (error) {
		  
		 console.log(error)
		}
	  }


	//   socket.on('user list', (users) => {
	// 	// update the UI to display the list of logged-in users
	// 	setLoggedInUsers(users);
	// 	console.log("logged in users");
	// 	console.log(users)
	// 	// console.log(loggedInUsers);
	//   });

	  };

	  useEffect(()=>{
		getUser();
	  },[])
	  
    const showFriends = () => {
	      	console.log(loggedInUsers);
		dispatch(setActiveComponent('friends'));
	  };
	  
	  const showChatbox = () => {
		dispatch(setActiveComponent('chatbox'));
	  };
	  
	  const showVideoCall = () => {
		dispatch(setActiveComponent('videoCall'));
	  };

	  const showAddFriend=()=>{
		dispatch(setActiveComponent('addFriend'));
	  }

	  const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	  };

	  const handleLogout=()=>{
	// socket.emit('remove', userid);
    localStorage.removeItem("token");
	deleteCookie('token','http://localhost:3000/dashboard');
	dispatch(logout());
    router.push("/");
	  }
	  
  	return (
    		<div className={styles.dashboard}>
      			<div className={styles.dashboardChild} />
				  <div className={styles.connectedFriendParent}>
				  <div className={styles.connectedFriend}>
				  <div className={styles.ellipseParent}>
				  <div className={styles.frameChild} />
				  {/* <FaUserAlt className={styles.iconPerson2} /> */}
				  <img src="/image/logo.png" className={styles.iconPerson2} alt="img" />
				  </div>
				  </div>
				  {/* <b className={styles.nirojThapa}>Niroj Thapa</b> */}
				  {
					       activeFriend && (
                                          userid==activeFriend.user[0]._id?
										  (
											<b className={styles.nirojThapa}>{activeFriend.user[1].name}</b>
										  ):(
                                               	<b className={styles.nirojThapa}>{activeFriend.user[0].name}</b>
										  )
										)}
				  </div>

				 <div className={styles.vectorParent}>
                  <BsPeopleFill
					className={`${styles.vectorIcon4} ${activeIcon === 'friends' ? styles.activeIcon : ''}`}
					onClick={showFriends}
					/>
					<BsFillChatLeftTextFill
					className={`${styles.vectorIcon4} ${activeIcon === 'chatbox' ? styles.activeIcon : ''}`}
					onClick={showChatbox}
					/>
					<BsCameraVideoFill
					className={`${styles.vectorIcon4} ${activeIcon === 'videoCall' ? styles.activeIcon : ''}`}
					onClick={showVideoCall}
					/>
             </div>
  

      <div className={styles.maincontainer}>
        {activeComponent === 'friends' && <Friends />}
        {activeComponent === 'chatbox' && <Chatbox />}
        {activeComponent === 'videoCall' && <VideoCall />}
		{activeComponent === 'addFriend' && <AddFriend/>}

      </div>

				  <AiOutlineMenu className={styles.iconMenu1} onClick={toggleSidebar} />

				  <div className={`${styles.sidebarcomponent} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        				<div className={styles.sidebar}>
						 <ImCross className={styles.cross} onClick={()=>{setIsSidebarOpen(false)}}/>
          					<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
          					<div className={styles.logOutParent} >
							    <b className={styles.logOut}>Log Out</b>
								<FaSignOutAlt className={styles.iconAccountLogout1} onClick={handleLogout}/>
							</div>

          					<div className={styles.sidebarChild} />
          					<div className={styles.user}>
            						<div className={styles.ellipseGroup}>
              							<div className={styles.frameItem} />
										
										  <FaUserAlt className={styles.iconPerson2}/>
            						</div>
            						<b className={styles.nirojThapa}>{username}</b>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameGroup}>
              					
												<BsInfoCircle className={styles.vectorIcon7}/>
                								<div className={styles.about}>About</div>
              				
              							<div className={styles.frameInner} />
            						</div>

            						<div className={styles.iconCogParent}>
										
										  <AiFillSetting className={styles.iconCog1}/>
              							<div className={styles.setting}>Setting</div>
            						</div>
            						<div className={styles.rectangleDiv} />
            						<div className={styles.rectangleParent} onClick={showAddFriend} >
              							<div className={styles.frameChild1} />
              							<div className={styles.addFriends}>Add Friends</div>
										
										  <BiUserPlus 
										  className={`${styles.vectorIcon8} ${activeIcon === 'addFriend' ? styles.activeIcon : ''}`}
										  onClick={showAddFriend}
										  />
            						</div>
            						<div className={styles.rectangleGroup}>
              							<div className={styles.frameChild1} />
              							<div className={styles.addFriends}>Feedback</div>
										
										  <RiFeedbackFill className={styles.vectorIcon8}/>
            						</div>
            						<div className={styles.rectangleContainer}>
              							<div className={styles.frameChild3} />
              							<div className={styles.details}>Details</div>
										
										  <BiSolidUserDetail className={styles.vectorIcon10}/>
            						</div>
          					</div>
          					<div className={styles.sidebarItem} />
        				</div>
      			</div>
    		</div>
			);
};

export default Dashboard;
