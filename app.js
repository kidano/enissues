const express = require("express");
const app = express();

const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// route GET pour afficher la page d'accueil

let donnees = [];
app.get("/", (req, res) => {
    res.render("accueil", {donnees});
});

app.post("/create", (req, res) => {
    
});

app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});