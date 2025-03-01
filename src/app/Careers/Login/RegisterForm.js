// RegisterForm.jsx
import styles from './register.module.css';
import { useState } from 'react';

const RegisterForm = ({ setShowLogin }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePic(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleFileReset = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setProfilePic(null);
        setPreviewUrl(null);
    };

    return (
        <section className={styles.section}>
            <div className={styles.wave}></div>
            <header className={styles.header}>
                <h3 className={styles.title}>Register</h3>
                <h4 className={styles.subtitle}>Create your account</h4>
            </header>
            <main className={styles.main}>
                <form className={styles.form}>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Full Name</label>
                        <input type="text" className={styles.input} placeholder="Enter your name" />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Email Address</label>
                        <input type="email" className={styles.input} placeholder="Enter your email" />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Phone Number</label>
                        <input 
                            type="tel" 
                            className={styles.input} 
                            placeholder="Enter your phone number" 
                        />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Address</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Enter your address" 
                        />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Password</label>
                        <input type="password" className={styles.input} placeholder="Enter your password" />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Confirm Password</label>
                        <input type="password" className={styles.input} placeholder="Confirm your password" />
                    </div>
                    <div className={styles.formItemTriple}>
                        <label className={styles.radioLabel}>Gender</label>
                        <div className={styles.formItem}>
                            <input type="radio" className={styles.radioInput} name="gender" value="male" /> Male
                            <input type="radio" className={styles.radioInput} name="gender" value="female" /> Female
                        </div>
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Profile Picture</label>
                        <div className={styles.uploadContainer}>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className={styles.fileInput}
                                id="profilePic"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profilePic" className={styles.uploadButton}>
                                {profilePic ? 'Change Image' : 'Choose Image'}
                            </label>
                            {profilePic && (
                                <div className={styles.fileInfo}>
                                    <a 
                                        href={previewUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.fileName}
                                    >
                                        {profilePic.name}
                                    </a>
                                    <button 
                                        type="button" 
                                        className={styles.resetButton}
                                        onClick={handleFileReset}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className={styles.submit}>Register</button>
                    <div className={styles.loginOption}>
                        Already have an account?
                        <button 
                            type="button" 
                            className={styles.loginLink}
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default RegisterForm;