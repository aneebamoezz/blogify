const { validateToken } = require('../services/auth')

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies?.[cookieName];

    console.log("COOKIE TOKEN =>", tokenCookieValue);

    if (!tokenCookieValue) return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      console.log("DECODED USER =>", userPayload);
      req.user = userPayload;
    } catch (err) {
      console.log("JWT VERIFY ERROR =>", err.message);
      res.clearCookie(cookieName);
    }

    return next();
  };
}

module.exports = { checkForAuthenticationCookie };