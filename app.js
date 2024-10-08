const express = require("express");
const app = express();
require("express-async-errors");
const userRouter = require("./src/routes/user-routes/userRouter");
const productRouter = require('./src/routes/user-routes/productRouter')
const cartRouter = require('./src/routes/user-routes/cartRouter')
const orderRouter = require('./src/routes/user-routes/orderRouter')
const adminCategoryRouter = require('./src/routes/admin-routes/categoryRouter')
const adminProductRouter = require('./src/routes/admin-routes/productRouter') 
const adminUserRouter = require('./src/routes/admin-routes/userRouter')
const adminOrderRouter = require('./src/routes/admin-routes/orderRouter')
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser')
const cors = require("cors");


app.use(cookieParser())
app.set("trust proxy", true);

// const corsOptions = {
//           origin: ['http://localhost:5173', 'https://chordchat.dev'],
//           optionsSuccessStatus: 200,
//           credentials: true
//         };
const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
        // intercept pre-flight check for all routes
        app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        httpOnly: true,
        signed: false,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    })
);

//user routers
app.use(userRouter);
app.use(productRouter)
app.use(cartRouter)
app.use(orderRouter)

//admin routers 
app.use(adminCategoryRouter)
app.use(adminUserRouter)
app.use(adminProductRouter)
app.use(adminOrderRouter)



module.exports = app;
