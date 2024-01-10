'use client'
import styles from './index.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '../../../component/api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaEye,FaEyeSlash} from 'react-icons/fa';

const Login = () => {

	const router=useRouter();

	const [email,setEmail]=useState();
	const [password,setPassword]=useState();
	const[showPassword,setShowPassword]=useState(false);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	  };


	// const handleLogIn=async()=>{
        
	// 	router.push('/dashboard')
	// }

	const handleLogIn = async(event) => {
		event.preventDefault();
		// console.log(`Email: ${email}, Password: ${password}`);
		event.preventDefault();
		const data={
		  "email":email,
		  "password":password
		}
		try{
		const res=await api.post('/api/user/login',data);
	
		if(res) {
				toast.success('Successfully login', {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					});
					localStorage.setItem('token', JSON.stringify(res.data.token));
					const userid=res.data._id;
					localStorage.setItem('userid', JSON.stringify(res.data._id));
					router.push(`/dashboard?userid=${userid}`); 
				}
		}catch(err){
			toast.error("Invalid email or password", {
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
				  router.push('/login');
				}, 3000);
			console.log(err);
		}
		setEmail('');
		setPassword('');
	  };

	  const googleAuth=async()=>{
    
        window.open(
            `${process.env.BACKEND_API}/user/auth/google`,
            "_self"
        )
    }

  	return (
    		<div className={styles.login}>
      			<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
      			<img className={styles.body1Icon} alt="" src="./image/body.png" />
      			<div className={styles.frameParent}>
        				<div className={styles.signInParent}>
          					<b className={styles.signIn}>Sign In</b>
          					<div className={styles.welcomeBackPlease1}>Welcome back! Please log in  your account</div>
					<input
						type="text"
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

          					<div className={styles.logIn}>Forgot Password ?</div>
            						<div className={styles.logInWrapper} onClick={handleLogIn}>
              							<div className={styles.logIn} >Log In</div>
            						</div>
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.vectorParent}>
                								<img className={styles.frameChild} alt="" src="Line 1.svg" />
                								<div className={styles.logIn}>or</div>
                								<img className={styles.frameItem} alt="" src="Line 2.svg" />
              							</div>
            						</div>
            						<div className={styles.rectangleParent} onClick={googleAuth} >
              							<div className={styles.frameInner} />
              							<img className={styles.newGoogleLogo497x500RemoveIcon1} alt="" src="./image/gl.png" />
              							<div className={styles.loginWithGoogle1}>{`Login with Google `}</div>
            						</div>
            						</div>
            						<div className={styles.loginChild} />
									<ToastContainer/>
            						</div>);
          					};
          					
          					export default Login;
          					