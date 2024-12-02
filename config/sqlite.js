const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  // db.run("DROP TABLE comments");
  db.run(
    `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        content TEXT,
        commenter TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
  // db.all("PRAGMA table_info(comments)", (err, rows) => {
  //   if (err) {
  //     console.error("Error fetching table info:", err);
  //   } else {
  //     console.log("Table info:", rows);
  //   }
  // });
});

module.exports = db;
