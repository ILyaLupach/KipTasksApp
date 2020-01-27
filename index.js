const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use("/", require("./api")); 

/* if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  } */

async function start () {
    try{
        await mongoose.connect( "mongodb+srv://Admin:admin@cluster0-ir1ax.mongodb.net/KIP", 
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("SERVER RUN...", PORT);
        })
    } catch (err) {
        console.log(err);
    }
} 

start();

