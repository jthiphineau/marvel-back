require("dotenv").config();
const express = require("express"); //OK
const cors = require("cors"); //OK
const app = express(); //OK
const axios = require("axios"); //OK
const md5 = require("js-md5");
app.use(cors()); //OK

const publicKey = "2f226faa2646e11fd84df0e42be7f78e";
const privateKey = "4c1414e433413024e155fb6a534d9d0a1f0ef190";
const ts = Math.floor(Date.now() / 1000);
const hash = md5(ts + privateKey + publicKey);

app.get("/", async (req, res) => {
  console.log("route /");
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  res.json(response.data);
});
app.get("/comics", async (req, res) => {
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  res.json(response.data);
});
app.get("/characters", async (req, res) => {
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  res.json(response.data);
});
app.all("*", function(req, res) {
  res.send("Page not found");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
