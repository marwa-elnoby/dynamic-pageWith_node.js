const express = require("express");
const forecast = require("./forecast");
const geocode = require("./geocode");

const app = express();

// Define Port For Application
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");

const path = require("path");
var hbs = require("hbs");

// Change Path Of Public Directory In The App
const publicDirectory = path.join(__dirname, "../Public");
app.use(express.static(publicDirectory));

// Change Path Of Public Directory In The App
const scriptDirectory = path.join(__dirname, "../JS");
app.use(express.static(scriptDirectory));

// Change Path Of Views Directory In The App
const viewsPath = path.join(__dirname, "../Views");
app.set("views", viewsPath);

// Change Path Of Partials Directory In The App
const partialsPath = path.join(__dirname, "../Partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "WEATHER",
  });
});

app.get("/service", (req, res) => {
  res.render("service", {
    title: "SERVICE",
    name: "Marwa",
    job: "Web Developer",
  });
});

app.get("/teams", (req, res) => {
  res.render("teams", {
    title: "TEAMS",
    name: "Marwa",
    city: "Tanta",
    age: 21,
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    Laptop: "Laptop-1",
    price: "Price-1",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address)
    return res.send({
      error: "YOU MUST PROVIDE ADDRESS",
    });
  geocode(address, (error, data) => {
    if (error) return res.send({ error });
    forecast(data.longtitude, data.latitude, (error, data) => {
      if (error) return res.send({ error });
      res.send({ forecast: data });
    });
  });
});

app.get("*", (req, res) => {
  res.render("<h2>ERROR 404 PAGE NOT FOUND</h2>");
});

// Define Port On Browser
app.listen(port, () => {
  console.log(`App Is Listening On Port ${port}`);
});
