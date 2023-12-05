'use client'

import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import styles from "./index.module.css";
import { useSelector,useDispatch } from "react-redux";
import { setActiveComponent } from "@/app/redux/slicers/activeFriendSlice";

const ENDPOINT=process.env.BACKEND_API
var socket;

export default function VideoCall() {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  // const [roomId, setRoomId] = useState("");
  const [ caller, setCaller ] = useState("")
  // const [ idToCall, setIdToCall ] = useState("")
  const [callAccepted, setCallAccepted] = useState(false);
  const [ callerSignal, setCallerSignal ] = useState()
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

   const dispatch=useDispatch();

  const activeFriend=useSelector((state)=>state.friend.activeFriend);

  const key=window.location.search;
	const urlParams=new URLSearchParams(key);
	const userid=urlParams.get('userid');

	useEffect(()=>{

		socket=io(ENDPOINT);
		socket.emit('setup',userid);
		// socket.on('connected',()=>setSocketConnected(true));
		socket.emit('join chat', activeFriend._id);
        
	  },[userid])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    socket.on("callUser", (data) => {
      console.log("Call users detail:", data);
      setReceivingCall(true);
      setName(data.name);
      setCallerSignal(data.signal);
      setCaller(data.from);
    });

    socket.on("endCall", (data) => {
      console.log(data);
      setCallEnded(true);

      if (myVideo.current.srcObject) {
        // Stop the media tracks
        const tracks = myVideo.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        // myVideo.current.srcObject = null;
      }

      // myVideo.current.srcObject = null;
      
      setTimeout(()=>{
        dispatch(setActiveComponent('friends'));
      },500);

    });
  }, []);

  const callRoom = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callRoom", {
        signalData: data,
        from: userid,
        name: userid==activeFriend.user[0]._id?activeFriend.user[0].name:activeFriend.user[1].name,
        roomId: activeFriend._id,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      console.log('call accepted');
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: activeFriend._id })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

  const leaveCall = () => {
    // setCallEnded(true);

    socket.emit('callEnd',{roomId: activeFriend._id });
  };


  return (
    <>
    <div className={styles.videoContainer}>
      <div className={styles.myVideoWrapper}>
        {stream && (
        <video playsInline muted ref={myVideo} autoPlay className={styles.myVideo} />
        )}
      </div>
      <div className={styles.friendVideoWrapper}>
        {callAccepted && !callEnded ? (
          <video playsInline ref={userVideo} autoPlay className={styles.friendVideo} />
        ) : null}
      </div>
    </div>
  
    <br/>
      <div className={styles.callButton}>
        {callAccepted && !callEnded ? (
          	<div className={styles.joinNowParent} onClick={leaveCall}>
              <b className={styles.joinNow} >End Now</b>
            </div>
        ) : (
            receivingCall?(
              <div className={styles.joinNowParent} onClick={leaveCall}>
              <b className={styles.joinNow} >End Now</b>
            </div>
            ):(
              <div className={styles.joinNowParent} onClick={callRoom}>
              <b className={styles.joinNow} >Call Now</b>
            </div>
            )
        )}
      </div>
   
    <div>
      {receivingCall && !callAccepted && userid!=caller? (
        <div className={styles.callerWrapper}>
          <h2 className={styles.caller}>{name} is calling...</h2>
          <div className={styles.answerCall} onClick={answerCall}>
              <b className={styles.joinNow} >Answer</b>
            </div>
        </div>
      ) : null}
    </div>
  </>
  );
}
