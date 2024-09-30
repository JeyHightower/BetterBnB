// backend/app.js
import express, { json } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import { crossOriginResourcePolicy } from 'helmet';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { environment, port, jwtConfig } from './config';
import routes from './routes';
import { ValidationError } from 'sequelize';
app.use(routes);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(json());
const app = express();

const isProduction = environment === 'production';



if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);




// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });


  // backend/app.js
// ...

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});


// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

export default app;