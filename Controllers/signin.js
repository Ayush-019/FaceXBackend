const handlesignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect Datatype Submission!");
  }

  db
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if (userData.length === 0) {
        res.status(400).json({
          error: "User does not exist, instead SIGNUP !",
        });
      } else {
        db.query(`SELECT * FROM users where email = '${email}';`)
          .then((data) => {
            const check = bcrypt.compareSync(password, data.rows[0].hash);
            if (check) {
              return (
                db
                  // .select("*")
                  // .from("users")
                  // .where("email", "=", email)
                  .query(`SELECT * FROM users where email = '${email}';`)
                  .then((user) => {
                    res.json(user.rows[0]);
                  })
                  .catch((err) => res.status(400).json("didn't get user"))
              );
            } else {
              res.status(200).json("Wrong Credentials1!!");
            }
          })
          .catch((err) => res.status(400).json("Wrong Credentials2!!"));
      }
    });

  // db.select("email", "hash")
  //   .from("login")
  //   .where("email", "=", email)
};

module.exports = {
  handlesignin: handlesignin,
};
