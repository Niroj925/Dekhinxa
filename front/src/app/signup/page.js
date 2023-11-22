'use client'

import styles from './index.module.css';
import api from '../../../component/api/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {FaEye,FaEyeSlash} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Signup = () => {

	const router=useRouter();

	const [username,setUsername]=useState('');
	const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const[showPassword,setShowPassword]=useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	  };


	const handleSubmit = async(event) => {
		event.preventDefault();
		const data={
		  "name":username,
		  "email":email,
		  "password":password
		}
		const res=await api.post('/api/user/register',data);
		console.log(res);
		if(res){
			toast.success('Successfully created Account', {
			  position: "bottom-right",
			  autoClose: 3000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  progress: undefined,
			  theme: "light",
			  });
			  
			  // router.push('/login');
			  setTimeout(() => {
				router.push('/login');
			  }, 3000);
			}
			else{
			  toast.error("Unable to create Account", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				});
				setTimeout(() => {
				  router.push('/');
				}, 3000);
			}
		
		setEmail('');
		setPassword('');
		setUsername(' ');
	  };


  	return (
    		<div className={styles.signup}>
      			<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
      			<div className={styles.createAnAccountParent}>
        				<div className={styles.signUp}>{`Create an Account `}</div>
        				<div className={styles.signup1}>
          					<div className={styles.signupChild} />
          					<div className={styles.frameParent}>
            						<div className={styles.signUpWrapper}>
              							<div className={styles.signUp}>Sign Up</div>
            						</div>
            						<div className={styles.frameChild} />
            						<div className={styles.frameGroup}>
                                      	<input
						type="text"
						id="username"
						name="username"
						className={styles.input}
						placeholder="Enter your username"
						value={username}
                        onChange={(e)=>setUsername(e.target.value)}
					/>
				                  	<input
						type="email"
						id="email"
						name="email"
						className={styles.input}
						placeholder="Enter your email"
						value={email}
                        onChange={(e)=>setEmail(e.target.value)}
					/>
					<div className={styles.input}>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						className={styles.input1}
						placeholder="Enter your password"
						value={password}
                        onChange={(e)=>setPassword(e.target.value)}
					/>
					<div onClick={handleShowPassword}>
					{
						showPassword?<FaEyeSlash className={styles.icon}/>:<FaEye className={styles.icon}/>
					}
					</div>
					
					</div>
              							<div className={styles.createAccountWrapper}>
                								<div className={styles.signUp} onClick={handleSubmit} >Create Account</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
				<ToastContainer/>
    		</div>);
};

export default Signup;
