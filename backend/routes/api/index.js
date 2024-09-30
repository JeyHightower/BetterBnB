// backend/routes/api/index.js
const router = require("express").Router();
import { setTokenCookie, restoreUser, requireAuth } from '../../utils/auth.js';
import { User } from '../../db/models';

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);


router.use('/session', require('./session.js').default);
router.use('/users', require('./users.js').default);

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', (req,res) => {
  res.json({ requestBody: req.body});
});

export default router;
