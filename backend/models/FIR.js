import mongoose from 'mongoose';

const firSchema = new mongoose.Schema(
    {
        fir_id: {
            type: String,
            required: true,
            unique: true,
        },
        aadhar_number: {
            type: String,
            required: true,
            minLength: 12,
            maxLength: 12,
        },
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        address: {
            type: String,
            required: true,
            maxLength: 200,
        },
        age: {
            type: String,
            required: true,
        },
        mobile_number: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 15,
        },
        complaint: {
            type: String,
            required: true,
            maxLength: 500,
        },
        ipc_section: {
            type: String, // This will be set by the Python script
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const FIR = mongoose.model('FIR', firSchema);
export default FIR;
