const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = async (req, res) => {
  if(req.query.authorizationCode){
    try {
      const {data : {access_token: accessToken}} = await axios.post(`https://github.com/login/oauth/access_token`,
        {
          client_id:clientID,
          client_secret:clientSecret,
          code:req.query.authorizationCode
        },{
          headers:{
            accept: "application/json"
          }
        }
      );

      if(!accessToken){
        res.status(400).send("Expired authorizationCode");
      }
      else{
        res.json({ accessToken });
      }
    } catch(e){
      console.log("Error occurred in /controllers/githubUserInfo/get.js");
      res.status(500).end('something wrong in server');
    }
  }
  else{
    res.status(400).send('authorizationCode is not exist');
  }
}