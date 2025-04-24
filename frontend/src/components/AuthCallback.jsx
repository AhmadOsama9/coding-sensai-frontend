import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import Loading from "./Loading";
import Error from "./Error";

const AuthCallback = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [status, setStatus] = useState('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const expiresIn = params.get('expires_in');
        const username = params.get("username");
        const imageUrl = params.get("image_url"); // Get image URL from query params
        const error = params.get('error');

        if (token) {
            try {
                setToken(token, parseInt(expiresIn, 10), username, imageUrl); // Pass imageUrl as well
                setStatus('success');
                setTimeout(() => navigate('/dashboard'), 2000);
            } catch (err) {
                console.error('Error setting token:', err);
                setStatus('error');
                setErrorMessage('Failed to set the token.');
                setTimeout(() => navigate('/'), 3000);
            }
        } else if (error) {
            console.error('Authentication failed:', error);
            setStatus('error');
            setErrorMessage('Authentication failed. Please try again.');
            setTimeout(() => navigate('/'), 3000);
        }
    }, [navigate, setToken]);

    return (
        <div className="flex items-center justify-center h-screen">
            {status === 'loading' && <Loading message="Authenticating... Please wait." />}
            {status === 'success' && <Loading message="Authentication successful! Redirecting to your dashboard..." />}
            {status === 'error' && <Error message={errorMessage} />}
        </div>
    );
}

export default AuthCallback;
