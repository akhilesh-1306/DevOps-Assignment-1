const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8081;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/microserviceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    bio: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/', async (req, res) => {
    const user = await User.findOne();
    if (!user) {
        await User.create({
            name: "Akhilesh Nekar",
            rollNumber: "2022BCD0034",
            bio: "A passionate full stack dev",
        });
    }

    const response = await User.findOne();
    res.send(`
        <html>
        <head>
            <title>DevOps Assignment 1</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #007bff;
                }
                p {
                    font-size: 18px;
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                    display: inline-block;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <h1>DevOps Assignment 1</h1>
            <p><strong>Name:</strong> ${response.name}</p><br>
            <p><strong>Roll Number:</strong> ${response.rollNumber}</p><br>
            <p><strong>Bio:</strong> ${response.bio}</p>
        </body>
        </html>
    `);
    
});

app.listen(PORT, () => console.log(`Web service running on port ${PORT}`));
