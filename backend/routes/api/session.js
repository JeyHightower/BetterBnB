// backend/routes/api/session.js
import { Op } from 'sequelize';
const router = (require('express')).Router();
import { setTokenCookie, restoreUser } from '/Users/jameshightower/Desktop/swe/projects/01-BetterBnB/backend/utils/auth';
import { User } from '../../db/models';
import { check } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation';


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
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]:{
                username: credential,
                email: credential
            }
        }
    });

    if(!user || !(require('bcryptjs')).compareSync(password, user.hashedPassword.toString())){
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
    setTokenCookie(res, safeUser);
return res.json({
    user: safeUser
});
});

//Log Out

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Success'});
});

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          }
        });
      } else return res.json({ user: null });
    }
  );


export default router;