// backend/routes/index.js
import { Router } from 'express';
import apiRouter from './api';

(Router()).use('/api', apiRouter);

// Add a XSRF-TOKEN cookie
(Router()).get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });


export default Router();