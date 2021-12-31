const handlesignin = (req, res,db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect Datatype Submission!");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const check = bcrypt.compareSync(password, data[0].hash);
      if (check) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("didn't get user"));
      } else {
        res.status(200).json("Wrong Credentials!!");
      }
    })
    .catch((err) => res.status(400).json("Wrong Credentials!!"));
};

module.exports = {
    handlesignin : handlesignin
}