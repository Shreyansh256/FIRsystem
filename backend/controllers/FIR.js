// Import the Audio model if you’re storing metadata in MongoDB
import FIR from '../models/FIR.js';
import { spawn } from 'child_process';
import { v4 as uuidv4 } from 'uuid'; // To generate unique fir_id
import console from 'console';

// Register FIR

// Controller function to register an FIR
export const registerFIR = async (req, res) => {
    try {
        const { aadhar_number, name, address, age, mobile_number, complaint } = req.body;

        // Generate unique FIR ID
        const fir_id = `FIR${new Date().toISOString().replace(/[-:.TZ]/g, '')}${Math.floor(Math.random() * 1000)}`;
        // console.log({ fir_id, aadhar_number, name, address, age, mobile_number, complaint });
        // console.log("p1");

        // Execute the Python script to get the IPC section
        const pythonProcess = spawn('python3', ['cnn/files.py', complaint]);
        let ipc_section = '';
        // console.log("p2");

        // Collect the output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            // console.log(data.toString());
            ipc_section += data.toString();

        });

        // Handle any errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            // console.log("p3");
            console.error(`Python error: ${data.toString()}`);
            return res.status(500).json({ message: 'Error processing complaint' });
        });

        pythonProcess.on('close', async (code) => {
            // console.log("p4");

            if (code !== 0) {
                return res.status(500).json({ message: 'Python script failed' });
            }

            // Trim the IPC section and ensure it is clean
            ipc_section = ipc_section.trim();

            console.log("IPC Section:", ipc_section);
            // console.log(ipc_section);

            // Get the current date and time
            const date = new Date().toISOString();

            // Create a new FIR document
            const newFIR = new FIR({
                fir_id,
                aadhar_number,
                name,
                address,
                age,
                mobile_number,
                complaint,
                ipc_section,
                date,
            });

            // Save the FIR document to the database
            await newFIR.save();
            // console.log(newFIR);

            // Send the saved FIR as the response
            res.status(201).json(newFIR);
        });
    } catch (error) {
        console.error('Error registering FIR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Fetch FIR and order them by recent first

export const fetchFIRs = async (req, res) => {
    try {
        const firs = await FIR.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            message: "FIRs fetched successfully",
            data: firs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching FIRs",
            error: err.message
        });
    }
};