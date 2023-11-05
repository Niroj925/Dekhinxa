'use client'
import styles from './index.module.css';
import {FaVideo} from 'react-icons/fa'
import { useRouter } from 'next/navigation';

const Hero = () => {
	const router=useRouter();


	const handleLogIn=()=>{
		router.push('/login');
	}

	const handleSignUp=()=>{
		router.push('/signup');
	}

  	return (
    		<div className={styles.hero}>
      			<div className={styles.heroChild} />
      			<div className={styles.heroItem} />
      			<div className={styles.heroInner} />
      			<img className={styles.cda86444f0a972baee3b78e32fRemIcon} alt="" src="./image/logo.png" />
      			<b className={styles.signUp} onClick={handleSignUp}>Sign Up</b>
      			<b className={styles.connectFaceToFaceFrom1}>Connect Face-to-Face  from Anywhere</b>
      			<div className={styles.joinNowParent} onClick={handleLogIn}>
        				<b className={styles.joinNow} >Join Now</b>
        				{/* <img className={styles.vectorIcon1} alt="" src="Vector.svg" /> */}
						<div className={styles.vectorIcon1}>
                            <FaVideo/>
                        </div>
      			</div>
      			<div className={styles.experienceTheSimplicity1}>Experience the simplicity and reliability of our video calling platform. Connect effortlessly with friends, family, or colleagues, anytime, anywhere</div>
      			<img className={styles.e8fd538f7b37442682f466b683Icon} alt="" src="./image/hi.png" />
    		</div>);
};

export default Hero;







