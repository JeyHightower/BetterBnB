// backend/routes/api/session.js
const express = require('express');
const { Op } = require ('sequelize');
const bcrypt = require ('bcryptjs');
const router = express.Router();
const { setTokenCookie, restoreUser } = require('/Users/jameshightower/Desktop/swe/projects/01-BetterBnB/backend/utils/auth');
const { User } = require('../../db/models');
<<<<<<< HEAD


// Log in
router.post('/', async (req, res, next) => {
=======
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
>>>>>>> 5cb6ba9 (step before adding columns complete)
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]:{
                username: credential,
                email: credential
            }
        }
    });

    if(!user || !bcrypt.compareSync(password, user.hashedPassword.toString())){
        const err = new Error ('Login failed');
        err.status = 401;
        err.title =  'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.'};
        return next(err);
    }

const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
};
<<<<<<< HEAD
await setTokenCookie(res, safeUser);
=======
    setTokenCookie(res, safeUser);
>>>>>>> 5cb6ba9 (step before adding columns complete)
return res.json({
    user: safeUser
});
});

//Log Out

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Success'});
});

<<<<<<< HEAD
=======
// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );
>>>>>>> 5cb6ba9 (step before adding columns complete)


module.exports = router;