

import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

async function requireAuth(req, res, next) {

  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');


  // console.log('Extracted Token:', token);

  if (!token) return res.sendStatus(401);
  // console.log('Token found, verifying...');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    // console.log("Working ")
    return next(); // Token is valid
  } catch (err) {
    // Only continue if token is expired
    if (err.name !== "TokenExpiredError") return res.sendStatus(403);

    try {
      const decoded = jwt.decode(token); // Still usable even if expired
      const userId = decoded.id;
      const email = decoded.email;
      const role = decoded.role;
      const first_name = decoded.first_name;
      const last_name = decoded.last_name;

      // Check if userId exists (prevent BigInt conversion error)
      if (!userId) {
        return res.sendStatus(403);
      }

      const refresh = await prisma.auth_tokens.findFirst({
        where: {
          user_id: userId,
          token_type: 'REFRESH',
          is_revoked: false
        }
      });
      
      if (!refresh) return res.sendStatus(403);

      const now = new Date();
      if (new Date(refresh.expires_at) < now) {
        // Expired refresh token
        await prisma.auth_tokens.delete({
          where: { token_id: refresh.token_id }
        });
        return res.sendStatus(403);
      }

      // Issue new access token
      const refreshPayload = {
        id: userId,
        email: email,
        role: role,
        first_name: first_name,
        last_name: last_name
      };
      
      const newToken = jwt.sign(refreshPayload, JWT_SECRET, { expiresIn: '30m' });
    
      // Set new token in cookie
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      // req.user = { id: userId, device_id: deviceId };
      req.user = {
        id: userId,
        email: email,
        role: role,
        first_name: first_name,
        last_name: last_name,
      };
      return next();
    } catch (e) {
      console.error("Refresh token error:", e);
      return res.sendStatus(403);
    }
  }
}

// module.exports = requireAuth;
export default requireAuth;
