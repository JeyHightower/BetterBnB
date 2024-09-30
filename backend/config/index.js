// backend/config/index.js
export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 8000;
export const dbFile = process.env.DB_FILE;
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN
};