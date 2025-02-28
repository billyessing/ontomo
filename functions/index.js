const functions = require('firebase-functions');
const express = require('express');
const auth = require('./util/auth');
const { setCorsHeaders } = require('./util/cors');

const app = express();

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


exports.api = functions.https.onRequest((req, res) => {
  // Apply CORS headers
  setCorsHeaders(req, res);

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Log headers for debugging (optional)
  const originalSend = res.send;
  res.send = function (...args) {
    console.log('Response Headers Before Send:', res.getHeaders());
    originalSend.apply(res, args);
  };

  // Pass to Express app
  app(req, res);
});