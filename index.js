const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { AuthValidator } = require("./middlewares/Auth.middleware");
const { userRouter } = require("./routes/User.route");
const { productRouter } = require("./routes/Product.route");

const app = express();
app.use(cors({
    origin:"*"
}));

app.use(express.json());
app.use("/users", userRouter);
app.use(AuthValidator);
app.use("/products", productRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the Database");
    } 
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
    console.log(`Running at port ${process.env.port}`);
});