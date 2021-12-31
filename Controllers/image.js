const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "9bddc386c44e4bf3b31408108fec23db",
});

const apiCall = (req,res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err=> res.staus(400).json('api call fail!'))
}

const hanldeimage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Error getting entries"));
};

module.exports = {
  hanldeimage: hanldeimage,
  apiCall : apiCall
};
