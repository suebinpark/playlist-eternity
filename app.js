const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const base_url =
  "https://port-0-playlist-eternity-m47c1rlvf34a3653.sel4.cloudtype.app/";

dotenv.config();
const entriesRouter = require("./routes/comments");

const app = express();
app.set("port", process.env.PORT || 8080);

app.use(
  cors({
    origin: base_url, // 클라이언트 배포 URL
    methods: ["GET", "POST", "DELETE"], // 허용할 HTTP 메서드
    credentials: true, // 인증 정보 포함 여부
  })
);
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public_2024")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/comments", entriesRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
