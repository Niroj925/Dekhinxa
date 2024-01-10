'use client'
import styles from './index.module.css';
import {BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

const ENDPOINT=process.env.BACKEND_API
var socket;

const VideoCall = () => {

	const activeFriend=useSelector((state)=>state.friend.activeFriend);

	console.log(activeFriend);

  const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	useEffect(()=>{

		socket=io(ENDPOINT);
		socket.emit('setup',userid);
		// socket.on('connected',()=>setSocketConnected(true));
		socket.emit('join chat', activeFriend._id);
        
	  },[userid])

  	return (
    		<div className={styles.videoCall}>
      			<div className={styles.friendsContainer2}>
        				<div className={styles.friends}>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.ellipseParent}>
                								<div className={styles.frameChild} />
                								{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
												<FaUserAlt className={styles.iconPerson5}/>
              							</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsCameraVideoFill className={styles.iconVideo5}/>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.ellipseParent}>
                								<div className={styles.frameChild} />
                								{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
												<FaUserAlt className={styles.iconPerson5}/>
              							</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsCameraVideoFill className={styles.iconVideo5}/>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.ellipseParent}>
                								<div className={styles.frameChild} />
                								{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
												<FaUserAlt className={styles.iconPerson5}/>
              							</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsCameraVideoFill className={styles.iconVideo5}/>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.ellipseParent}>
                								<div className={styles.frameChild} />
                								{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
												<FaUserAlt className={styles.iconPerson5}/>
              							</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsCameraVideoFill className={styles.iconVideo5}/>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.ellipseParent}>
                								<div className={styles.frameChild} />
                								{/* <img className={styles.iconPerson5} alt="" src={`🦆 icon "person".svg`} /> */}
												<FaUserAlt className={styles.iconPerson5}/>
              							</div>
            						</div>
            						<b className={styles.nirojThapa}>Niroj Thapa</b>
            						{/* <img className={styles.iconVideo5} alt="" src={`🦆 icon "video".svg`} /> */}
									<BsCameraVideoFill className={styles.iconVideo5}/>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default VideoCall;
