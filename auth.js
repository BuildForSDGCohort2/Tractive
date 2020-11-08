require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (role) => {
  return async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) return res.send('access denied!');
    try {
      await jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
        if (err) return res.status(403).send('Authorization Denied');
        else {
          res.user = data.user;
          if (data.user.role === 'Admin') next();
          else if (role === 'farmer' && data.user.role === 'farmer') next();
          else if (role === 'agent' && data.user.role === 'agent') next();
          else if (role === 'owner' && data.user.role === 'owner') next();
          else
            return res
              .status(403)
              .send('Authorization Denied, you are not admin');
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  };
};

module.exports = auth;
