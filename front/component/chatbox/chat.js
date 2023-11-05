import styles from './index.module.css';
import {FaUserAlt,FaSignOutAlt,FaSearch} from 'react-icons/fa'

const MessageBox = () => {
  	return (
    		<div className={styles.messageBox}>
      			<div className={styles.msgbox}>
        				<div className={styles.frameParent}>
          					<div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
            						{/* <img className={styles.iconPerson4} alt="" src={`🦆 icon "person".svg`} /> */}
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
          					<div className={styles.thisMessageIsJustForYouGWrapper}>
            						<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
          					</div>
        				</div>
        				<div className={styles.frameGroup}>
          					<div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
            						{/* <img className={styles.iconPerson4} alt="" src={`🦆 icon "person".svg`} /> */}
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
          					<div className={styles.thisMessageIsJustForYouGWrapper}>
            						<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
          					</div>
        				</div>
        				<div className={styles.frameDiv}>
          					<div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
            						{/* <img className={styles.iconPerson4} alt="" src={`🦆 icon "person".svg`} /> */}
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
          					<div className={styles.thisMessageIsJustForYouGWrapper}>
            						<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
          					</div>
        				</div>
        				<div className={styles.frameParent1}>
          					<div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
            						{/* <img className={styles.iconPerson4} alt="" src={`🦆 icon "person".svg`} /> */}
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
          					<div className={styles.thisMessageIsJustForYouGWrapper}>
            						<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
          					</div>
        				</div>
        				<div className={styles.thisMessageIsJustForYouGWrapper2}>
          					<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
        				</div>
        				<div className={styles.thisMessageIsJustForYouGWrapper3}>
          					<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
        				</div>
        				<div className={styles.thisMessageIsJustForYouGWrapper4}>
          					<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
        				</div>
        				<div className={styles.thisMessageIsJustForYouGWrapper5}>
          					<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
        				</div>
      			</div>
    		</div>);
};

export default MessageBox;
