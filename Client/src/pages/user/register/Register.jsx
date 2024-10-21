import { useState } from 'react';
import styles from '../login.module.css'
import { AstroBack, Astronaut } from '../../../assets/Index.js';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { TfiLock } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        let formErrors = {};

        if (!name) {
            formErrors.name = 'Please enter your name.';
        }
        if (!email || !validateEmail(email)) {
            formErrors.email = 'Please enter a valid email address.';
        }
        if (!password || password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters long.';
        }
        if (password !== confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match.';
        }
        
        if (Object.keys(formErrors).length === 0) {
            console.log('Registration submitted', formData);
        } else {
            setErrors(formErrors);
        }
       
    };

    const handleLoginClick = () => {
        navigate('/login');
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
                <h1 className={styles.loginTitle}>Register</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <IoPersonOutline className={styles.iconEmail}/>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className={styles.input}
                            // required
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <MdOutlineMail className={styles.iconEmail}/>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
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
                    <div className={styles.inputContainer}>
                        <TfiLock className={styles.iconPassword}/>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
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
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        Register
                    </button>
                </form>
                <p className={styles.registerText}>
                    Have no account yet?
                </p>
                <button 
                    type='button' 
                    className={styles.registerButton}
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </div>
        </div>
  )
}

export default Register