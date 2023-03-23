import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan";
import authRouter from "./routes/auth"
import weatherRouter from "./routes/weather"

const cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");
require('./models/connection')
const app = express();

app.use(
  session({
    secret: 'a4f8071f-c873-4447-8ez1',
    resave: false,
    saveUninitialized: false,
  })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(helmet());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.get('/test', (req, res) => {
  res.send({ test: 'test' })
})

// app.use("/user", UserRouter)
app.use("/auth", authRouter);
app.use('/weather', weatherRouter);


app.get('/data', (req: any, res: any) => {
  const data = 'Hello from the backend';

  res.status(200).json({ data: data });
})


export default app
