import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

connect();

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connected to DB");
const handleError = (error) => console.log(`❌ ${error}`);

// 연결, 에러, 접속 끊김이 일어나면 콜백함수를 실행합니다.
// 연결 끊길 시 자동으로 재접속을 실행하게끔 콜백함수를 설정했습니다.
db.once("open", handleOpen);
db.on("error", handleError);
db.on("disconnected", connect);
