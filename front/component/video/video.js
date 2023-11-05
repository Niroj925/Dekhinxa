import styles from './index.module.css';
import {BsInfoCircle,BsPeopleFill,BsFillChatLeftTextFill,BsCameraVideoFill} from 'react-icons/bs'
import {FaUserAlt,FaSignOutAlt} from 'react-icons/fa'

const VideoCall = () => {
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
