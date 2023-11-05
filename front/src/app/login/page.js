'use client'
import styles from './index.module.css';
import { useRouter } from 'next/navigation';


const Login = () => {

	const router=useRouter();

	const handleLogIn=()=>{
		router.push('/dashboard')
	}
  	return (
    		<div className={styles.login}>
      			<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
      			<img className={styles.body1Icon} alt="" src="./image/body.png" />
      			<div className={styles.frameParent}>
        				<div className={styles.signInParent}>
          					<b className={styles.signIn}>Sign In</b>
          					<div className={styles.welcomeBackPlease1}>Welcome back! Please log in  your account</div>
          					<div className={styles.userWrapper}>
            						<div className={styles.user}>User</div>
          					</div>
          					<div className={styles.userWrapper}>
            						<div className={styles.password}>Password</div>
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
            						<div className={styles.rectangleParent}>
              							<div className={styles.frameInner} />
              							<img className={styles.newGoogleLogo497x500RemoveIcon1} alt="" src="./image/gl.png" />
              							<div className={styles.loginWithGoogle1}>{`Login with Google `}</div>
            						</div>
            						</div>
            						<div className={styles.loginChild} />
            						</div>);
          					};
          					
          					export default Login;
          					