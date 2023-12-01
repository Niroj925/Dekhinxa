'use client'

import styles from './index.module.css';
import {FaUserAlt,FaPaperPlane} from 'react-icons/fa';
import { useState,useEffect,useRef} from 'react';
import { useSelector } from 'react-redux';
import api from '../api/api';
import { getCookie } from '../function/function';
// import io from 'socket.io-client';
import { io } from 'socket.io-client';
const ENDPOINT=process.env.BACKEND_API
var socket;


const MessageBox = () => {
	const [message,setMessage]=useState('');
	const [msg,setMsg]=useState([]);
	const [typing,setTyping]=useState(false);
	const [isTyping,setIsTyping]=useState(false);

	const msgContainerRef = useRef(null);

	const activeFriend=useSelector((state)=>state.friend.activeFriend);

	const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

    
	useEffect(()=>{
		socket=io(ENDPOINT);
		socket.on('typing',()=>setIsTyping(true));
		socket.on('stop typing',()=>setIsTyping(false));
	  },[])

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
	
		//   console.log(msg);
		  socket.emit('join chat', activeFriend._id);
		// console.log(response.data);
	  
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

			
             
			setMessage('');
			socket.emit('new message', response.data);
			// console.log(response.data);
			setMsg([...msg,response.data]);
			fetchMessage();

		}catch(err){
			console.log(err);
		}
	}

	useEffect(() => {
		socket.on('message received', (newMessageReceived) => {
		//   console.log('message received:')
		  console.log(newMessageReceived);
		  if (activeFriend._id !== String(newMessageReceived.chat._id)) {
			// console.log('chat not matched');
		
		  } else {
			setMsg([...msg, newMessageReceived]);
		  }
		});
	  }, [msg]);

	  const scrollToBottom = () => {
		if (msgContainerRef.current) {
		  msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
		}
	  };

		useEffect(() => {
				scrollToBottom();
			}, [msg]);
	const handleChange=(event)=>{
		setMessage(event.target.value);

		if (!typing) {
		  setTyping(true);
		  socket.emit('typing', activeFriend._id);
		}
		
		let lastTypingTime = new Date().getTime();
		var timerLength = 4000;
		setTimeout(() => {
		  var timeNow = new Date().getTime();
		  var timeDiff = timeNow - lastTypingTime;
		  if (timeDiff >= timerLength && typing) {
		   
			socket.emit('stop typing', activeFriend._id);
			setTyping(false);
		  }
		}, timerLength);
	}

	const handleSend=(event)=>{
		if (event.key === 'Enter') {
			event.preventDefault(); 
			sendMessage();
		  }
	}

  	return (
    		<div className={styles.messageBox}>
      			<div className={styles.msgbox} ref={msgContainerRef}>
        		      <div>
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

							<div className={styles.isTyping}>
								{isTyping ? (
							<div >
								<p>Typing...</p>
							
							</div>
						) : <></>}
							</div>

								

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
						onKeyDown={handleSend}
						
						/>
					</div>
					<FaPaperPlane className={styles.vectorIcon1} onClick={sendMessage} />
					</div>		
    		</div>
			);
};

export default MessageBox;
