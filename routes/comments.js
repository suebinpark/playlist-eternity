const express = require("express");
const db = require("../config/sqlite.js");
const router = express.Router();

// GET /comments 라우터
router.get("/", (req, res) => {
  const sql = "SELECT * FROM comments";
  db.all(sql, [], (err, result) => {
    if (err) console.log("query is not excuted: " + err);
    else res.send(result);
  });
});

router.post("/", (req, res) => {
  // console.log(req.body, req.params, req.query);
  const author = req.body["author"];
  const content = req.body["content"];
  const commenter = req.body["commenter"];
  console.log(author, content, commenter);
  const sql =
    "INSERT INTO comments (author, content, commenter) VALUES (?,?,?);";

  db.run(sql, [author, content, commenter], function (err, result) {
    if (err) console.log("query is not executed: " + err);
    res.send(result);
  });
});

router.delete("/:id", (req, res) => {
  // console.log(req.params.id);
  const sql = "DELETE FROM comments WHERE id= ?";

  db.run(sql, [req.params.id], function (err, result) {
    if (err) console.log("query is not executed: " + err);
    res.send(result);
  });
});

module.exports = router;
