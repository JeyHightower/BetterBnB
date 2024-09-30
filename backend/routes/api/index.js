// backend/routes/api/index.js
const router = require('express').Router();

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  // POST /api/login
router.post('/login', async (req, res) => {
  const { credential, password } = req.body;
  const user = await User.findOne({
    where: {
      [Sequelize.Op.or]: [{ username: credential }, { email: credential }],
    },
  });
  if (!user) {
    const err = new Error('Invalid credential');
    err.title = 'Invalid credential';
    err.errors = { message: 'Invalid credential' };
    err.status = 401;
    return next(err);
  }
  const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!isValidPassword) {
    const err = new Error('Invalid password');
    err.title = 'Invalid password';
    err.errors = { message: 'Invalid password' };
    err.status = 401;
    return next(err);
  }
  const token = await setTokenCookie(res, user);
  return res.json({ user: user });
});


// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    hashedPassword,
  });
  const token = await setTokenCookie(res, user);
  return res.json({ user: user });
});


// POST /api/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out successfully' });
});

module.exports = router;