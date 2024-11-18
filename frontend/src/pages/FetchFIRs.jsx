import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const FIRCard = ({ fir }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    FIR Number: {fir.fir_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Name:</strong> {fir.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {fir.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Complaint:</strong> {fir.complaint}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>IPC Section:</strong> {fir.ipc_section}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {fir.date}
                </Typography>
            </CardContent>
        </Card>
    );
};

const FIRList = () => {
    const [firs, setFirs] = useState([]);
    const token = useSelector((state) => state.token);
    useEffect(() => {
        const fetchFirs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fir/fetchFIR', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the token in Authorization header
                    },
                });
                if (response.data.success) {
                    setFirs(response.data.data); // Limit to the first 5 FIRs
                } else {
                    console.error('Failed to fetch FIRs');
                }
            } catch (error) {
                console.error('Error fetching FIRs:', error);
            }
        };

        fetchFirs();
    }, []);

    return (
        <Box sx={{ padding: '2rem' }}>
            <Grid container spacing={2} justifyContent="center">
                {firs.map((fir) => (
                    <Grid item xs={12} sm={6} md={4} key={fir._id}>
                        <FIRCard fir={fir} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FIRList;
