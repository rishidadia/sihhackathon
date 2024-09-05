const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Initialize the Express app
const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

// MongoDB connection string
const uri = 'mongodb+srv://nshreshta2006:eaqwXLsAwEfkJsq9@cluster0.dkqju.mongodb.net/';

// Initialize MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    // Specify the database and collections
    const database = client.db('BigO');
    const accomplishmentCollection = database.collection('accomplishments');
    const eventCollection = database.collection('events');
    const announcementCollection = database.collection('announcements');

    // POST route for uploading accomplishments
    app.post('/upload-accomplishment', async (req, res) => {
      try {
        const data = req.body;
        console.log('Received accomplishment data:', data);
        
        // Insert the accomplishment data into the collection
        const result = await accomplishmentCollection.insertOne(data);
        console.log("Accomplishment inserted:", result);
        
        res.json({ success: true, message: 'Accomplishment uploaded successfully' });
      } catch (error) {
        console.error('Error handling accomplishment upload:', error);
        res.status(500).json({ success: false, message: 'Failed to upload accomplishment' });
      }
    });

    // POST route for uploading events
    app.post('/upload-event', async (req, res) => {
      try {
        const data = req.body;
        console.log('Received event data:', data);
        
        // Insert the event data into the collection
        const result = await eventCollection.insertOne(data);
        console.log("Event inserted:", result);
        
        res.json({ success: true, message: 'Event uploaded successfully' });
      } catch (error) {
        console.error('Error handling event upload:', error);
        res.status(500).json({ success: false, message: 'Failed to upload event' });
      }
    });

    // POST route for uploading announcements
    app.post('/upload-announcement', async (req, res) => {
      try {
        const data = req.body;
        console.log('Received announcement data:', data);
        
        // Insert the announcement data into the collection
        const result = await announcementCollection.insertOne(data);
        console.log("Announcement inserted:", result);
        
        res.json({ success: true, message: 'Announcement uploaded successfully' });
      } catch (error) {
        console.error('Error handling announcement upload:', error);
        res.status(500).json({ success: false, message: 'Failed to upload announcement' });
      }
    });

    // Example: Fetching all accomplishments
    app.get('/accomplishments', async (req, res) => {
      try {
        const accomplishments = await accomplishmentCollection.find({}).toArray();
        res.json(accomplishments);
      } catch (error) {
        console.error('Error fetching accomplishments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch accomplishments' });
      }
    });

    // Example: Fetching all events
    app.get('/events', async (req, res) => {
      try {
        const events = await eventCollection.find({}).toArray();
        res.json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch events' });
      }
    });

    // Example: Fetching all announcements
    app.get('/announcements', async (req, res) => {
      try {
        const announcements = await announcementCollection.find({}).toArray();
        res.json(announcements);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch announcements' });
      }
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
