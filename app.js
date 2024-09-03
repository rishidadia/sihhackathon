const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
app.use(express.json())

// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})
// routes
app.get('/Profile', (req, res) => {
  //res.json({mssg: "welcome to the api"})
  // const page = req.query.p || 0
  // const MembersPerPage = 3
  let entries = []

  db.collection('Profile')
    .find()
    //.sort({Name: Member 01})
    //.skip(page * MembersPerPage)
    //.limit(MembersPerPage)
    .forEach(entry => entries.push(entry))
    .then(() => {
      res.status(200).json(entries)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})
app.get('/Profile/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('Profile')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })

  } else {
    res.status(500).json({error: 'Could not fetch the document'})
  }
})
app.post('/Profile', (req, res) => {

 const newentry = req.body

    db.collection('Profile')
      .insertOne(newentry)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not create a new document'})
      })
})
app.delete('/Profile/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('Profile')
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete the document'})
      })

  } else {
    res.status(500).json({error: 'Not a valid Id'})
  }
})
app.patch('/Profile/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {

    db.collection('Profile')
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update the document'})
      })

  } else {
    res.status(500).json({error: 'Not a valid Id'})
  }
})