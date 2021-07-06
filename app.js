const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

//app에 라우트 파일을 연결해줍니다.
require("./routers")(app);

app.listen(5000, () => {
  console.log(`Ready, URL : http://localhost:5000`);
})