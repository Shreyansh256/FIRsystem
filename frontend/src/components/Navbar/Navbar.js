import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
    return (
        <Box component="section" sx={{
            p: 2,
            border: '1px solid grey',
            backgroundColor: '#ffc400',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
        }}>
            <Box>
                <Typography sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400
                }}>
                    IntelliFIR
                </Typography>

            </Box>
            <Box sx={{ p: 2 }}>
                <Typography>Add a Complaint</Typography>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </Box>

    );
}

export default Navbar;
