'use client'
import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt,FaSearch} from 'react-icons/fa'
import { useState } from 'react';

const ConnectedFriends = () => {

	const [friend,setFriend]=useState();
  	return (
    		<div className={styles.connectedFriends}>
      			<div className={styles.friendsContainer2}>
        				<div className={styles.friends}>
          					<div className={styles.frameParent}>
            						<div className={styles.ellipseParent}>
              							<div className={styles.frameChild} >
              							{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
										<FaUserAlt className={styles.iconPerson5}/>
										</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}

									<BsFillChatLeftTextFill className={styles.vectorIcon}/>
									<BsCameraVideoFill className={styles.iconVideo5} />
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.ellipseParent}>
              							<div className={styles.frameChild} >
              							{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
										  <FaUserAlt className={styles.iconPerson5}/>
										  </div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsFillChatLeftTextFill className={styles.vectorIcon}/>
									<BsCameraVideoFill className={styles.iconVideo5} />
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.ellipseParent}>
              							<div className={styles.frameChild} >
              							{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
										  <FaUserAlt className={styles.iconPerson5}/>
										  </div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsFillChatLeftTextFill className={styles.vectorIcon}/>
									<BsCameraVideoFill className={styles.iconVideo5} />
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.ellipseParent}>
              							<div className={styles.frameChild} >
              							{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
										  <FaUserAlt className={styles.iconPerson5}/>
										  </div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsFillChatLeftTextFill className={styles.vectorIcon}/>
									<BsCameraVideoFill className={styles.iconVideo5} />
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.ellipseParent}>
              							<div className={styles.frameChild} >
              							{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
										  <FaUserAlt className={styles.iconPerson5}/>
										  </div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.vectorIcon} alt="" src="Vector.svg" />
            						<img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsFillChatLeftTextFill className={styles.vectorIcon}/>
									<BsCameraVideoFill className={styles.iconVideo5} />
          					</div>
        				</div>
      			</div>
      			<img className={styles.connectedFriendsChild} alt="" src="Rectangle 4.svg" />
      			<div className={styles.searchBox}>
        				{/* <div className={styles.searchFriends}>Search Friends...</div> */}
        				{/* <img className={styles.iconMagnifyingGlass1} alt="" src={`🦆 icon "magnifying glass".svg`} /> */}
						<input
						 type='text'
						 id='friend'
						 placeholder='Search new friends...'
						 className={styles.searchFriend}
						 value={friend}
						 onChange={(e)=>setFriend(e.target.value)}
						/>
					
						<FaSearch className={styles.iconMagnifyingGlass1}/>
      			</div>
    		</div>);
};

export default ConnectedFriends;
