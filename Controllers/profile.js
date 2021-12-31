const handleprofile = (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        console.log(user[0]);
      } else {
        res.status(400).json("user not found!");
      }
    })
    .catch((err) => res.status(400).json("Error getting user!"));
};

module.exports = {
    handleprofile : handleprofile
}