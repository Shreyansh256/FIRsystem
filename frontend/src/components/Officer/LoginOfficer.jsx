import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOfficerLogin } from '../../redux/slices/storeJwt/storeJwt.js';
import { TextField, Button, Typography } from '@mui/material';

const LoginOfficer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(5).required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:3001/officer/login', values);

                const { userOfficer, token } = response.data;
                console.log("hi", { officer: userOfficer, token });
                // Save the officer details and token to Redux
                dispatch(setOfficerLogin({ user: userOfficer, token })); // Ensure the keys match your slice logic

                console.log('Login successful:', userOfficer);
                resetForm();

                // Redirect to home page after successful login
                navigate('/home');
            } catch (error) {
                console.error('Error logging in officer:', error.response?.data || error.message);
            }
        },
    });

    return (
        <div style={{ width: '20vw', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login Officer
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                >
                    Login
                </Button>
            </form>


        </div>
    );
};

export default LoginOfficer;
