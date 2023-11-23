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

const Dashboard = () => {
	const [activeComponent, setActiveComponent] = useState('friends');
	const [activeIcon, setActiveIcon] = useState('friends');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [username,setUsername]=useState('');

	const router=useRouter();

	const token=localStorage.getItem('token');

	if(token == 'undefined'){
		router.push('/login');
	}

	const getUser = async () => {

		const token=localStorage.getItem('token')

	if(token == 'undefined'){
		router.push('/login');
	}else{
		try {
		  const response = await api.get('/api/user/uservalidate',
			{
			  headers: {
				token: JSON.parse(token),
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
	  };

	  useEffect(()=>{
		getUser();
	  },[])
	  
    const showFriends = () => {
		setActiveComponent('friends');
		setActiveIcon('friends'); // Add this line
	  };
	  
	  const showChatbox = () => {
		setActiveComponent('chatbox');
		setActiveIcon('chatbox'); // Add this line
	  };
	  
	  const showVideoCall = () => {
		setActiveComponent('videoCall');
		setActiveIcon('videoCall'); // Add this line
	  };

	  const showAddFriend=()=>{
		setActiveComponent('addFriend');
		setActiveIcon('addFriend'); 
	  }

	  const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	  };

	  const handleLogout=()=>{
		// socket.emit('remove', userid);
    localStorage.removeItem("token");
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
				  <b className={styles.nirojThapa}>Niroj Thapa</b>
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
				  {/* <div className={styles.sidebarcomponent} style={{ display: isSidebarOpen ? 'block' : 'none' }}> */}
        				<div className={styles.sidebar}>
						 <ImCross className={styles.cross} onClick={()=>{setIsSidebarOpen(false)}}/>
          					<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
          					<div className={styles.logOutParent} >
							    <b className={styles.logOut}>Log Out</b>
								<FaSignOutAlt className={styles.iconAccountLogout1} onClick={handleLogout}/>
							</div>
									
							{/* <div className={styles.logOutParent}>
            						<b className={styles.logOut}>Log Out</b>
									
									<FaSignOutAlt className={styles.iconAccountLogout1}/>
          					</div> */}
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
              							{/* <div className={styles.vectorGroup}> */}
											
												<BsInfoCircle className={styles.vectorIcon7}/>
                								<div className={styles.about}>About</div>
              							{/* </div> */}
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
    		</div>);
};

export default Dashboard;
