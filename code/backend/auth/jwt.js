const jwt = require('jsonwebtoken');

function generateAccessToken(user_id) {
  return jwt.sign(user_id, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })
}

module.exports = { generateAccessToken, authenticateToken };
