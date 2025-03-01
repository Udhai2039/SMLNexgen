// ForgotPasswordForm.jsx
import styles from '../Login/register.module.css';
import { useState } from 'react';

const ForgotPasswordForm = ({ setShowForgotPassword }) => {
    const [step, setStep] = useState(1); // 1: email input, 2: OTP input, 3: reset password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const staticOtp = "123456"; // Static OTP for testing

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter an email address');
            return;
        }
        // Simulate sending OTP (no backend needed)
        console.log(`Simulating OTP sent to ${email}. Static OTP is: ${staticOtp}`);
        setStep(2);
        setError('');
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === staticOtp) {
            // OTP matches the static value
            console.log('Static OTP verified successfully');
            setStep(3);
            setError('');
        } else {
            // OTP does not match
            setError('Invalid OTP. Please enter 123456 for testing.');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            if (!newPassword) {
                setError('Please enter a new password');
                return;
            }
            // Simulate password reset (no backend needed)
            console.log(`Password reset to: ${newPassword}`);
            setShowForgotPassword(false); // Return to login
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setStep(1);
            setError('');
        } else {
            setError('Passwords do not match!');
        }
    };

    return (
        <>
            <header className={styles.header}>
                <h3 className={styles.title}>
                    {step === 1 ? 'Forgot Password' : 
                     step === 2 ? 'Verify OTP' : 'Reset Password'}
                </h3>
                <h4 className={styles.subtitle}>
                    {step === 1 ? 'Enter your email' : 
                     step === 2 ? 'Enter the OTP (use 123456)' : 'Set new password'}
                </h4>
            </header>
            <main className={styles.main}>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {step === 1 ? (
                    <form className={styles.form} onSubmit={handleSendOtp}>
                        <div className={styles.boxItem}>
                            <label className={styles.label}>Email Address</label>
                            <input 
                                type="email" 
                                className={styles.input} 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submit}>Send OTP</button>
                        <div className={styles.loginOption}>
                            <button 
                                type="button" 
                                className={styles.loginLink}
                                onClick={() => setShowForgotPassword(false)}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : step === 2 ? (
                    <form className={styles.form} onSubmit={handleVerifyOtp}>
                        <div className={styles.boxItem}>
                            <label className={styles.label}>OTP</label>
                            <input 
                                type="text" 
                                className={styles.input} 
                                placeholder="Enter the OTP (123456)" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submit}>Verify OTP</button>
                        <div className={styles.loginOption}>
                            <button 
                                type="button" 
                                className={styles.loginLink}
                                onClick={() => setShowForgotPassword(false)}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className={styles.form} onSubmit={handleResetPassword}>
                        <div className={styles.boxItem}>
                            <label className={styles.label}>New Password</label>
                            <input 
                                type="password" 
                                className={styles.input} 
                                placeholder="Enter new password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.boxItem}>
                            <label className={styles.label}>Confirm Password</label>
                            <input 
                                type="password" 
                                className={styles.input} 
                                placeholder="Confirm new password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submit}>Reset Password</button>
                        <div className={styles.loginOption}>
                            <button 
                                type="button" 
                                className={styles.loginLink}
                                onClick={() => setShowForgotPassword(false)}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </>
    );
};

export default ForgotPasswordForm;