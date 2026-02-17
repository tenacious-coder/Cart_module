// Note: This middleware uses raw SQL for dynamic table queries
// We'll keep the old db connection for this specific use case
import db from '../db.js';

function checkOwnershipFromJWT({ table, idParam = 'id',matchColumn = 'id', ownerColumn = 'user_id' }) {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id; 
      const resourceId = req.body[idParam];
	  console.log(userId, resourceId);
      if (!userId || !resourceId) {
        return res.status(400).json({ error: 'Missing user or resource ID' });
      }

      const [rows] = await db.query(
        `SELECT ${ownerColumn} FROM ${table} WHERE ${matchColumn} = ?`,
        [resourceId]
      );

      if (!rows.length) {
        return res.status(404).json({ error: 'Not found' });
      }
	 
      const ownerId = rows[0][ownerColumn];
      if (ownerId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      next();
    } catch (err) {
      console.error('Ownership check error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

// module.exports = checkOwnershipFromJWT;
export default checkOwnershipFromJWT;
