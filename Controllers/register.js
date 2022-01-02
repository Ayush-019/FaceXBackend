const handleregister = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("Incorrect Datatype Submission!");
  }
  const hash = bcrypt.hashSync(password);
  var user = {
    name: name,
    email: email,
    hash: hash,
  };

  db.query(`SELECT * FROM users where email = '${email}';`).then((data) => {
    let userData = data.rows;

    if (userData.length !== 0) {
      res.status(400).json({
        error: "User already exists",
      });
    } else {
      db.query(
        `INSERT INTO users (name, email, hash) VALUES ('${user.name}','${user.email}', '${user.hash}');`
      );
      db.query(`SELECT * FROM users WHERE email = '${email}';`)
        .then((user) => {
          res.json(user.rows[0]);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "Database Error1",
          });
        });
    }
  });
};

module.exports = {
  handleregister: handleregister,
};
