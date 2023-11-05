'use client'

import styles from './index.module.css';


const Signup = () => {
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
              							<div className={styles.usernameWrapper}>
                								<div className={styles.signUp}>Username</div>
              							</div>
              							<div className={styles.usernameWrapper}>
                								<div className={styles.signUp}>Email</div>
              							</div>
              							<div className={styles.usernameWrapper}>
                								<div className={styles.signUp}>Password</div>
              							</div>
              							<div className={styles.createAccountWrapper}>
                								<div className={styles.signUp}>Create Account</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Signup;
