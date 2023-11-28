'use client'

import styles from './index.module.css';
import {FaUserAlt,FaPaperPlane} from 'react-icons/fa';
import { useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import api from '../api/api';
import { getCookie } from '../function/function';

const MessageBox = () => {
	const [message,setMessage]=useState('');
	const [msg,setMsg]=useState([]);

	const activeFriend=useSelector((state)=>state.friend.activeFriend);

	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

    const fetchMessage = async () => {

		const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));

		try {
		  const response = await api.get(
			`/api/message/${activeFriend._id}`,
			{
			  headers: {
				token: token
			  }
			}
		  );

		  (response.data.length>0)?setMsg(response.data):setMsg([]);
	
		  console.log(msg);
		//   socket.emit('join chat', selectedChat._id);
		console.log(response.data);
	  
		} catch (err) {
		  console.log(err);
		}
	  };

	  useEffect(()=>{
		fetchMessage();
	},[]);

	const sendMessage=async () =>{
		const token=getCookie('token') || JSON.parse(localStorage.getItem('token'));

		try {
			const response=await api.post('/api/message',
			{
				msg:message,
				chatId:activeFriend._id
			},
			{
				headers:{
					token:token
				}
			}
			);

			console.log(response.data);
             
			setMessage('');
			setMsg([...msg,response.data]);
			fetchMessage();

		}catch(err){
			console.log(err);
		}
	}


	const handleChange=(event)=>{
		setMessage(event.target.value);
		// console.log(message);
	}

  	return (
    		<div className={styles.messageBox}>
      			<div className={styles.msgbox}>
        				{/* <div className={styles.frameParent}>
          					<div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
									
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
          					<div className={styles.thisMessageIsJustForYouGWrapper}>
            						<div className={styles.thisMessageIs8}>This message is just for you gaich</div>
          					</div>
        				</div> */}
        		
							{msg.map((m, index) => (
                            
		                       <>
							   {
								(m.sender._id==userid)?(
                                  <>
								<div className={styles.sendtextBox} key={index}>
							
							<div className={styles.messageWrapper2} >

							   <p className={styles.thisMessageIs8}>{m.content}</p>
							  </div>
						</div>
								  </>
								):(
									<>
								<div className={styles.receivetextBox} key={index}>
								{/* <div className={styles.ellipseParent}>
            						<div className={styles.frameChild} />
									
									<FaUserAlt className={styles.iconPerson4}/>
          					</div>
							 */}
							<div className={styles.messageWrapper1} >

							   <p className={styles.thisMessageIs8}>{m.content}</p>
							  </div>
						</div>
									</>
								)
							   }

							</>

							))}
					
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
					<FaPaperPlane className={styles.vectorIcon1} onClick={sendMessage} />
					</div>


						
    		</div>
			);
};

export default MessageBox;
