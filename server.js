const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'users.xlsx');

// Helper function to create an Excel file if it doesn't exist
const createExcelFileIfNotExist = () => {
    if (!fs.existsSync(filePath)) {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet([['Username', 'Password']]); // Column headers
        xlsx.utils.book_append_sheet(wb, ws, 'Users');
        xlsx.writeFile(wb, filePath);
        console.log('Excel file created successfully.');
    }
};

// Create the Excel file if it doesn't exist
createExcelFileIfNotExist();

// Signup Route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    console.log('Signup attempt with:', { username, password });

    try {
        const wb = xlsx.readFile(filePath);
        const ws = wb.Sheets['Users'];

        // Check if the user already exists
        const existingUsers = xlsx.utils.sheet_to_json(ws);
        const userExists = existingUsers.some(user => user.Username === username);

        if (userExists) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Add new user
        existingUsers.push({ Username: username, Password: password });

        // Create new worksheet with updated data
        const newWs = xlsx.utils.json_to_sheet(existingUsers);
        wb.Sheets['Users'] = newWs;  // Update the existing worksheet
        xlsx.writeFile(wb, filePath);

        console.log('User registered successfully:', { username });
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred while saving user data', error: error.message });
    }
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const wb = xlsx.readFile(filePath);
        const ws = wb.Sheets['Users'];
        const existingUsers = xlsx.utils.sheet_to_json(ws);

        const user = existingUsers.find(user => user.Username === username && user.Password === password);

        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
