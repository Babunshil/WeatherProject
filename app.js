const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , (req , res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , (req , res)=>{
  const query =req.body.cityName;
  const apiKey = "b55eb7185240a3f865afeaab8aab6891";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units=" +unit+ "&#";

  https.get(url , (response)=> { 
    response.on("data" , (data)=> {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1> The Temperature in " +query+ " is " + temp + " Degrees Celcius </h1>");
      res.write("<img src="+imgUrl+">")
      res.write("<P>The weather is currently " + weatherDescription + "</p>");
      res.send();  
    })
  })
})



app.listen(3000, ()=> {
  console.log("server is listening on the port of 3000");
})