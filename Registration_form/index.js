
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('files'));
mongoose.connect("mongodb://localhost:27017/registration");
const db = mongoose.connection;
db.on("error", () => console.log("error in connect database"));
db.once("open",() => console.log("connected to database"));
const userSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
    Number: String
});
const User = mongoose.model('User', userSchema);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/files/index.html");
});
app.post("/register" ,async(req, res) => {
try {
    const { Username, Email, Password, Number } = req.body;
    // const existingUser = await User.findOne({Email:Email});
    // if(!existingUser){
        const newUser = new User({
            Username,
            Email,
            Password,
            Number
        });
        await newUser.save();
        res.redirect("/success")
    // }else{
    //     console.log("This user already exists");
    //     res.redirect("/unsuccess");    }
} catch (error) {
    console.log("Unsuccessful rgistraton", error);
    res.redirect("/unsuccess")
}
});
app.get("/success" ,(req,res)=>{
    console.log("Successfully inserted data");
    res.sendFile(__dirname + '/files/success.html');
});
app.get("/unsuccess" ,(req,res)=>{
    console.log("UnSuccessfully inserted data");
    res.sendFile(__dirname + '/files/error.html');})
app.listen(PORT , () => {
    console.log(`server running on port ${PORT}`);
});
