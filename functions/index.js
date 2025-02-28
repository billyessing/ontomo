const functions = require('firebase-functions');
const express = require('express');
const auth = require('./util/auth');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.set('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  next();
});

// meetings
const {
  getAllMeetings,
  postOneMeeting,
  deleteMeeting,
  editMeeting
} = require('./api/meetings')


// users
const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails
} = require('./api/users')


// whereby
const {
  createRoom
} = require('./api/whereby')


// meeting routes
app.get('/meetings', auth, getAllMeetings);
app.post('/meeting', auth, postOneMeeting);
app.delete('/meeting/:meetingId', auth, deleteMeeting);
app.put('/meeting/:meetingId', auth, editMeeting);


// user routes
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);


// whereby routes
app.post('/create-room', createRoom)


exports.api = functions.https.onRequest(app);