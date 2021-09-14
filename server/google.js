const router = require('express').Router();
const bodyparser = require('body-parser');
const request = require('request');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID =
  '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
module.exports = router;

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  let token = req.body.token;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
  }
  verify()
    .then(() => {
      res.cookie('session-token', token);
      res.send('success');
    })
    .catch(console.error);
});

router.get('/profile', checkAuthenticated, (req, res) => {
  let user = req.user;
  res.render('profile', { user });
});

router.get('/protectedRoute', checkAuthenticated, (req, res) => {
  res.send('This route is protected');
});

router.get('/logout', (req, res) => {
  res.clearCookie('session-token');
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.redirect('/login');
    });
}
