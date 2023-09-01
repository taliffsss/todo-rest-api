import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (userId: string | number) => {
  return jwt.sign({ id: userId }, 'todo-api', {
    expiresIn: '2h', // token will expire in 1 hour
  });
};

// Verify JWT token
export const verifyToken = (token: string | undefined) => {
  console.log(token)
  if (!token) {
    return null;
  }
  
  try {
    return jwt.verify(token, 'todo-api');
  } catch (e) {
    return null;
  }
};
