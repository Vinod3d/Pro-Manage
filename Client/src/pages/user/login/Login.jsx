import { useState } from 'react';
import styles from '../login.module.css'
import { AstroBack, Astronaut } from '../../../assets/Index.js';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { TfiLock } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formErrors = {};
        
        if (!email || !validateEmail(email)) {
            formErrors.email = 'Please enter a valid email address.';
        }
        if (!password || password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters long.';
        }

        if (Object.keys(formErrors).length === 0) {
            console.log('Login submitted', { email, password });
        } else {
            setErrors(formErrors);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

  return (
    <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.astronautContainer}>
                    <img src={Astronaut} alt="Astronaut" className={styles.astronaut} />
                    <img src={AstroBack} alt="AstroBack" className={styles.astroback}/>
                </div>
                <h2 className={styles.welcome}>Welcome aboard my friend</h2>
                <p className={styles.subtitle}>Just a couple of clicks and we start</p>
            </div>
            <div className={styles.rightSide}>
                <h1 className={styles.loginTitle}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <MdOutlineMail className={styles.iconEmail}/>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.input}
                            // required
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <TfiLock className={styles.iconPassword}/>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={styles.input}
                            // required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.showPasswordButton}
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                        </button>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        Log in
                    </button>
                </form>
                <p className={styles.registerText}>
                    Have no account yet?{' '}
                </p>
                <button 
                    type='button' 
                    className={styles.registerButton}
                    onClick={handleRegisterClick}
                >
                    Register
                </button>
            </div>
        </div>
  )
}

export default Login