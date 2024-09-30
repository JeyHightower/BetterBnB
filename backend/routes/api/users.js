// backend/routes/api/users.js
import { Router } from 'express';
import { hashSync } from 'bcryptjs';
import { setTokenCookie, requireAuth } from '../../utils/auth';
import { User } from '../../db/models';
const router = Router();
import { check } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation';




const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];




// Sign up
router.post(
    '/',validateSignup,
    async (req, res) => {
        const { email, password, username } = req.body;
        const hashedPassword = hashSync(password);
        const user = await User.create({
            email,
            username,
            hashedPassword
        });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);


export default router;