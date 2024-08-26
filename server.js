const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, mobile, email, address, addressType, dob, occupation, password } = req.body;

    // Define the path to the CSV file
    const filePath = path.join(__dirname, 'signups.csv');

    // Prepare the data to be appended to the CSV file
    const newLine = `${name},${mobile},${email},${address},${addressType},${dob},${occupation},${password}\n`;

    // Append the data to the CSV file
    fs.appendFile(filePath, newLine, (err) => {
        if (err) {
            console.error('Failed to write to CSV file', err);
            return res.status(500).send('Server error');
        }

        console.log('Data saved successfully');
        res.send('Your data has been successfully submitted and saved.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
