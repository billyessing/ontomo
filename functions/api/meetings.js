const { db } = require('../util/admin');

exports.getAllMeetings = (req, res) => {
  let userData = {};
  db
    .doc(`/users/${req.user.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // get partner schools
        userData.userCredentials = doc.data();
        let schools = [req.user.email]
        if (userData.userCredentials.partnerSchools) {
          schools = schools.concat(userData.userCredentials.partnerSchools)
        }

        db
          .collection('meetings')
          .where('email', 'in', schools)
          .orderBy('createdAt', 'desc')
          .get()
          .then((data) => {
            let meetings = [];
            data.forEach((doc) => {
              meetings.push({
                meetingId: doc.id,
                title: doc.data().title,
                link: doc.data().link,
                email: doc.data().email,
                createdAt: doc.data().createdAt,
              });
            });
            return res.json(meetings);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};


exports.postOneMeeting = (req, res) => {
  if (req.body.link.trim() === '') {
    return res.status(400).json({ link: 'Must not be empty' });
  }

  if (req.body.title.trim() === '') {
    return res.status(400).json({ title: 'Must not be empty' });
  }

  const newMeetingItem = {
    title: req.body.title,
    link: req.body.link,
    email: req.user.email,
    createdAt: new Date().toISOString()
  }

  db
    .collection('meetings')
    .add(newMeetingItem)
    .then((doc) => {
      const resMeetingItem = newMeetingItem;
      resMeetingItem.id = doc.id;
      return res.json(resMeetingItem);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};


exports.deleteMeeting = (req, res) => {
  const document = db.doc(`/meetings/${req.params.meetingId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({
          error: 'Meeting not found'
        })
      }
      if (doc.data().email !== req.user.email) {
        return res.status(403).json({ error: "UnAuthorized" })
      }
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code
      });
    });
};


exports.editMeeting = (req, res) => {
  if (req.body.meetingId || req.body.createdAt) {
    res.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db.collection('meetings').doc(`${req.params.meetingId}`);
  document.update(req.body)
    .then(() => {
      res.json({ message: 'Updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code
      });
    });
};