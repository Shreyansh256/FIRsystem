import React, { useState } from 'react';
import LoginOfficer from '../../components/Officer/LoginOfficer.jsx';
import RegisterOfficer from '../../components/Officer/RegisterOfficer.jsx';
import QuoteCard from '../../components/QuoteCard/QuoteCard.jsx'; // Assuming you already have QuoteCard.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ReactComponent as MySvgImage } from "../../assets/login.svg";
import './OfficerLoginPage.css'; // Add CSS file for styling

function OfficerLoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="officer-login-page">
            <div className="form-container">
                {!isRegistering ? <LoginOfficer /> : <RegisterOfficer />}
                <Button
                    variant="contained"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="toggle-button"
                >
                    {!isRegistering ? 'Already have an account? Login!' : 'Create an Account!'}
                </Button>
            </div>
            <div className='officer-info'>
                {/* <div className='officer-svg'>
                    <MySvgImage style={{ width: '30vw', height: 'auto' }} />
                </div> */}

                <div className='officer-quotes'>
                    <QuoteCard /> {/* Adding QuoteCard */}
                </div>
            </div>
        </div>
    );
}

export default OfficerLoginPage;
