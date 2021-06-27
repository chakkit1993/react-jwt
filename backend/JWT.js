const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    console.log(user.id);

  const accessToken = sign(
    { username: user.username, id: user.id },
    "jwtsecretplschange"
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.headers["x-access-token"];//req.cookies["token"];
    console.log(accessToken);
  
  
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });
  
  
      verify(accessToken, "jwtsecretplschange" , (err,decoded)=>{
          if(err){
              res.json({auth : false , message : "Eerorr auth"})
          }else{
              req.userId = decoded.id;
              next();
          }
      })
    // try {
    //   const validToken = verify(accessToken, "jwtsecretplschange");
    //   if (validToken) {
    //     req.authenticated = true;

    //     return next();
    //   }
    // } catch (err) {
    //   return res.status(400).json({ error: err });
    // }
  };

module.exports = { createTokens ,validateToken};