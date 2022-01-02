const handleprofile = (req, res,db) => {
  const { id } = req.params;
  let found = false;
  // db.select("*")
  //   .from("users")
  //   .where({ id: id })
  db.query(`SELECT * FROM users where id = '${id}';`)
    .then((user) => {
      if (user.rows.length) {
        console.log(user.rows[0]);
        res.json(user.rows[0]);
      } else {
        res.status(400).json("user not found!");
      }
    })
    .catch((err) => res.status(400).json("Error getting user!"));
};

module.exports = {
    handleprofile : handleprofile
}