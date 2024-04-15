// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'plantex'; // Change this to your database name

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection('user_questions');

    // Define route to handle form submissions
    app.post('/submit-form', (req, res) => {
        const { email, subject, message } = req.body;
        
        // Insert data into the database
        collection.insertOne({ email, subject, message }, (err, result) => {
            if (err) {
                console.error('Error inserting document:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Document inserted successfully:', result.ops[0]);
            res.send('Form submitted successfully!');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
