//author @james
const Users = require("../Chomplog-main/Models/Users.Models");
const loggedIn = function (req, res, next) {
  let XAuth = req.get("Authorization");
 // Coco made a little change on author @James code
  Users.getId(XAuth, (err, id) => {
    if (err || id == null) {
      return res.status(401).send("Unauthorized");
    }  // the end of change
  
   //Users.getIdFromXAuth(XAuth, (err, id) => {
   // if (err || id == null) {
    //  return res.statuse(401).send("id is null");
    //}
    return id, next();
  });
};

module.exports = {
  loggedIn: loggedIn,
};
