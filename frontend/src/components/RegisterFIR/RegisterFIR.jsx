import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { ReactComponent as MySvgImage } from "../../assets/registerFIR.svg";
import './Register.css'; // Import the CSS file
import Navbar from '../Navbar/Navbar';


const FIRRegistration = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(true);
    const [recognition, setRecognition] = useState(null);
    const [language, setLanguage] = useState('en-US'); // Default language set to English (US)

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = language;
            setRecognition(rec);
        } else {
            setSpeechSupported(false);
        }
    }, [language]); // Reinitialize recognition when the language changes

    const formik = useFormik({
        initialValues: {
            aadhar_number: '',
            name: '',
            address: '',
            age: '',
            mobile_number: '',
            complaint: '',
        },
        validationSchema: Yup.object({
            aadhar_number: Yup.string()
                .required('Aadhar number is required')
                .length(12, 'Aadhar number must be 12 digits'),
            name: Yup.string()
                .required('Name is required')
                .max(100, 'Name cannot exceed 100 characters'),
            address: Yup.string()
                .required('Address is required')
                .max(200, 'Address cannot exceed 200 characters'),
            age: Yup.number()
                .required('Age is required')
                .min(1, 'Age must be greater than 0')
                .max(120, 'Age cannot exceed 120'),
            mobile_number: Yup.string()
                .required('Mobile number is required')
                .min(10, 'Mobile number must be at least 10 digits')
                .max(15, 'Mobile number cannot exceed 15 digits'),
            complaint: Yup.string()
                .required('Complaint is required')
                .max(500, 'Complaint cannot exceed 500 characters'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch('http://localhost:3001/fir/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    alert('FIR Registered Successfully');
                    resetForm();
                } else {
                    const error = await response.json();
                    alert('Error: ' + error.message);
                }
            } catch (err) {
                alert('Error submitting FIR');
            }
        },
    });

    const handleSpeechToText = () => {
        if (recognition) {
            if (isRecording) {
                recognition.stop();
                setIsRecording(false);
            } else {
                recognition.lang = language; // Update language before starting
                recognition.start();
                setIsRecording(true);

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    formik.setFieldValue('complaint', formik.values.complaint + ' ' + transcript);
                };

                recognition.onerror = (event) => {
                    alert('Speech recognition error: ' + event.error);
                };

                recognition.onend = () => {
                    setIsRecording(false);
                };
            }
        }
    };

    return (
        <div>
            <Navbar />

            <div className='main-div'>
                <div className="glass-container" >
                    <h2 className='register-title'>Register FIR</h2>
                    <form className="form-tag" onSubmit={formik.handleSubmit}>
                        {/* Aadhar Number and Name */}
                        <div className="form-field" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <TextField
                                label="Aadhar Number"
                                variant="outlined"
                                name="aadhar_number"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.aadhar_number}
                                error={formik.touched.aadhar_number && Boolean(formik.errors.aadhar_number)}
                                helperText={formik.touched.aadhar_number && formik.errors.aadhar_number}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        mx: '8px',
                                        my: '8px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        mx: '8px',
                                        my: '8px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                        </div>

                        {/* Age and Mobile Number */}
                        <div className="form-field" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <TextField
                                label="Age"
                                variant="outlined"
                                name="age"
                                type="number"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.age}
                                error={formik.touched.age && Boolean(formik.errors.age)}
                                helperText={formik.touched.age && formik.errors.age}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        mx: '8px',
                                        my: '8px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                name="mobile_number"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.mobile_number}
                                error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                                helperText={formik.touched.mobile_number && formik.errors.mobile_number}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        mx: '8px',
                                        my: '8px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                        </div>

                        {/* Address */}
                        <div className="form-field">
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                name="address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        mx: '8px',
                                        my: '8px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                        </div>

                        {/* Complaint */}
                        <div className="form-field">
                            <TextField
                                label="Complaint"
                                variant="outlined"
                                fullWidth
                                name="complaint"
                                multiline
                                rows={4}
                                onChange={formik.handleChange}
                                value={formik.values.complaint}
                                error={formik.touched.complaint && Boolean(formik.errors.complaint)}
                                helperText={formik.touched.complaint && formik.errors.complaint}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: '#BFD7FF',
                                        paddingBottom: '10px',
                                        paddingLeft: '10px',
                                    },
                                }}
                            />
                        </div>

                        {/* Speech Recognition */}
                        {speechSupported && (
                            <>
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel>Select Language</InputLabel>
                                        <Select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            label="Select Language"
                                        >
                                            <MenuItem value="en-US">English (US)</MenuItem>
                                            <MenuItem value="hi-IN">Hindi</MenuItem>
                                            <MenuItem value="ta-IN">Tamil</MenuItem>
                                            <MenuItem value="mr-IN">Marathi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleSpeechToText}
                                    sx={{ mt: 2 }}
                                >
                                    {isRecording ? 'Stop Recording' : 'Record Grievance'}
                                </Button>
                            </>
                        )}
                        {!speechSupported && <p>Your browser does not support speech recognition.</p>}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </form>


                </div>
                <div>
                    <MySvgImage />
                </div>
            </div>
        </div>
    );
};

export default FIRRegistration;
