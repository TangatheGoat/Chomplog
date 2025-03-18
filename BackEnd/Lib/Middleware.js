//author @james
const Users = require("../Group11-main/Models/Users.Models");
const loggedIn = function (req, res, next) {
  let XAuth = req.get("Authorization");
 // Coco made a little change on author @James code
  Users.getId(XAuth, (err, id) => {
    if (err || id == null) {
      return res.status(401).send("Unauthorized");
    }  // the end of change
  
    return id, next();
  });
};

module.exports = {
  loggedIn: loggedIn,
};
