from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# MongoDB connection string mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.e7d3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
uri="mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.e7d3t.mongodb.net/"
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collection
db = client['CollegeSphere']
collection = db['events']

# API endpoint to save event data
@app.route('/api/saveEvent', methods=['POST'])
def save_event():
    event_data = request.json
    try:
        result = collection.insert_one(event_data)
        return jsonify({'message': 'Event saved successfully', 'id': str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
