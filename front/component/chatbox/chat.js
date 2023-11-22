'use client'

import styles from './index.module.css';
import {FaUserAlt,FaPaperPlane} from 'react-icons/fa';
import { useState} from 'react';

const MessageBox = () => {
	const [message,setMessage]=useState('');
	const [msg,setMsg]=useState([]);

	// useEffect(()=>{
	// 	setMessage('');
	// },[msg]);

	const handleClick=()=>{
		if(message.length>0){
	   setMsg(prevMessages => [...prevMessages, message]);
		}
	   setMessage('');
	   console.log(msg);
	   console.log(message);   
	}
	const handleChange=(event)=>{
		setMessage(event.target.value);
		// console.log(message);
	}

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
        		
						<ul>
							{msg.map((m, index) => (
							<li key={index}>
								<div className={styles.messageWrapper2}>
          					<div className={styles.thisMessageIs8}>{m}</div>
        				    </div>
								</li>
							))}
						</ul>      			
      			</div>

				  <div className={styles.frameParent2}>
					<div className={styles.messageWrapper}>
						<input
						type="text"
						id="messageInput"
						name="message"
						className={styles.messageInput}
						placeholder="Type your message..."
						value={message}
						onChange={handleChange}
						/>
					</div>
					<FaPaperPlane className={styles.vectorIcon1} onClick={handleClick} />
					</div>


						
    		</div>
			);
};

export default MessageBox;
