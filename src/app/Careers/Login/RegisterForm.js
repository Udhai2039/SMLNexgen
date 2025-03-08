'use client';

import { useState } from 'react';
import styles from './register.module.css';

const RegisterForm = ({ setShowLogin }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        gender: '',
        profilePic: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null); // General form error
    const [phoneError, setPhoneError] = useState(''); // Phone-specific error
    const [passwordError, setPasswordError] = useState(''); // Password-specific error
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // Phone validation: only numbers, exactly 10 digits
            const numericValue = value.replace(/[^0-9]/g, '');
            if (numericValue.length <= 10) {
                setFormData({ ...formData, [name]: numericValue });
                if (numericValue.length > 0 && numericValue.length !== 10) {
                    setPhoneError('Phone number must be exactly 10 digits.');
                } else {
                    setPhoneError('');
                }
            }
        } else if (name === 'password') {
            // Password validation
            setFormData({ ...formData, [name]: value });
            const hasAlphabet = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const isLongEnough = value.length >= 8;

            if (value.length > 0) {
                if (!isLongEnough) {
                    setPasswordError('Password must be at least 8 characters long.');
                } else if (!hasAlphabet || !hasNumber || !hasSymbol) {
                    setPasswordError('Password must include letters, numbers, and special symbols.');
                } else {
                    setPasswordError('');
                }
            } else {
                setPasswordError('');
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, profilePic: file });
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleFileReset = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setFormData({ ...formData, profilePic: null });
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Phone validation on submit
        if (formData.phone && formData.phone.length !== 10) {
            setError('Phone number must be exactly 10 digits.');
            return;
        }

        // Password validation on submit
        const hasAlphabet = /[a-zA-Z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
        const isLongEnough = formData.password.length >= 8;

        if (!isLongEnough || !hasAlphabet || !hasNumber || !hasSymbol) {
            setError('Password must be at least 8 characters and include letters, numbers, and special symbols.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataToSend.append(key, formData[key]);
            }
        });

        const endpoints = [
            'http://localhost:5000/api/users/register',
            'http://192.168.0.197:5000/api/users/register',
        ];

        for (const url of endpoints) {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    body: formDataToSend,
                });

                const data = await res.json();
                console.log(`Registration Response from ${url}:`, data);

                if (!res.ok) {
                    throw new Error(data.message || `Registration failed at ${url}`);
                }

                setSuccess('Registration successful! Redirecting...');
                setTimeout(() => setShowLogin(true), 2000);
                return; // Exit loop on success
            } catch (err) {
                console.error(`Error with ${url}:`, err.message);
                if (url === endpoints[endpoints.length - 1]) {
                    setError('Registration failed on all servers: ' + err.message);
                }
            }
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.wave}></div>
            <header className={styles.header}>
                <h3 className={styles.title}>Register</h3>
                <h4 className={styles.subtitle}>Create your account</h4>
            </header>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Full Name</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Enter your name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            className={styles.input} 
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Phone Number</label>
                        <input 
                            type="tel" 
                            className={styles.input} 
                            placeholder="Enter your phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                        />
                        {phoneError && <p className={styles.error}>{phoneError}</p>}
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Address</label>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Enter your address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Password</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {passwordError && <p className={styles.error}>{passwordError}</p>}
                    </div>
                    <div className={styles.boxItem}>
                        <label className={styles.label}>Confirm Password</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formItemTriple}>
                        <label className={styles.radioLabel}>Gender</label>
                        <div className={styles.formItem}>
                            <input 
                                type="radio" 
                                className={styles.radioInput} 
                                name="gender" 
                                value="male"
                                onChange={handleChange}
                            /> Male
                            <input 
                                type="radio" 
                                className={styles.radioInput} 
                                name="gender" 
                                value="female"
                                onChange={handleChange}
                            /> Female
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
                                {formData.profilePic ? 'Change Image' : 'Choose Image'}
                            </label>
                            {formData.profilePic && (
                                <div className={styles.fileInfo}>
                                    <a 
                                        href={previewUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.fileName}
                                    >
                                        {formData.profilePic.name}
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
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
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