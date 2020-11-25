const express = require('express');
const router = express.Router();
const jwk = { "keys": [{ "alg": "RS256", "e": "AQAB", "kid": "iwyP99U0IxLHLpQC1aNaxu+5jRgmC+bnhEV66wAQjwY=", "kty": "RSA", "n": "221MsOZw-QoyaS9j9Xr4Shc4NLPVZbyKZ3_Y75wq5x3mJS_9vm4PxCUI2idyJjoWto6bSVclTi-Jsbzp726ZlhQ6AVYeyUzLrQyZesD_8C-QxVXBg38rNS-ZaaJUB_Cd7NbhMAV2LWnNwykTG3uP6GVy1bxMJVGjrT6OUqLS8rnq3VIdt3lkdRGr0Mrkn6nDvOvQjiTZx7jWKqLv8MH7T-Vnzlg4KKo5bRVG5L-lsizzdHW7MGQ57PE1qP6H6Kuyduvk5whYjLhDHl9sq1cTgZmij6rYs911lDjQmslr_gOCKdeAGJrOZjgUom__qhHTgVMMLQxIXEwCKq4amp-fRw", "use": "sig" }, { "alg": "RS256", "e": "AQAB", "kid": "G1VSPEKzdZ5Cm8GQcpMOAXiMuGPLD2iVnrsikMHr2wQ=", "kty": "RSA", "n": "tjswURkxR6wpB72lBP8HI7Tk3XIAc_6NRj1cs1mPrr_ONhTlKMpA9-85Ke4ySXpp7aoyKIvcK7MCOtsJfxAf4TLD_3ucV-YmHZNC9RvOM3J3EzdWpTHuEk_AFWGp7aVu37TjGN_fqetwdXiVL7LlEZWKfVUOWUgwNpgBzOA-Dc0O2MBhZoaubdLvG3-LBHwSHs7MsXGdgZxZrucwClkx1MNesKbI93q-dKkHPycUyPrfhQPJvDt5FJmwXGHs8q1v2s2W6_AXeVbErciN7A_t6TQ5odyCLlBHa8f66yNUWNLLcnNFfbFujx62tjbSqW9po0gjgu9vQxgIZkgnvLw1lw", "use": "sig" }] }

const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const pem = jwkToPem(jwk.keys[1]);

const byPass = [
  "/api/",
  "/api/instruments",
  "/api/teachers/profiles",
  "/api/answer_url",
  "/api/signup",
  "/api/hooks",
  "/api/test"
]
/* GET home page. */
router.use(async function (req, res, next) {
  if (byPass.includes(req.originalUrl) || req.originalUrl.includes("/answer_url")) {
    return next();
  }
  let token = req.headers["authorization"]
  if (!token) {
    return res.status(401).json("Access denied. No token provided");
  }

  try {
    // Remove Bearer from token
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, pem, { algorithms: ['RS256'] }, function (err, decodedToken) {
      return decodedToken;
    });
    // is authorized
    if (decoded) {
      req.body.sub = decoded.sub
      req.body.email = decoded.username
      req.body.role = decoded['cognito:groups'] ? decoded['cognito:groups'][0] : "student"
      next();
    } else {
      res.status(401).json("Invalid token");
    }
  } catch (ex) {
    console.log(ex);
    res.status(400).json("Bad request");
  }
})

module.exports = router;
