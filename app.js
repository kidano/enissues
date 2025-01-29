const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let issues = [
  {
    auteur: "SamSoule",
    titre: "Problème avec EJS",
    description: "ma vue EJS ne marche pas",
    etat: "en cours",
  },
  {
    auteur: "Bob",
    titre: "Bug dans le formulaire",
    description: "Le champ email ne fonctionne pas",
    etat: "résolu",
  },
];

app.get(["/", "/issues"], (req, res) => {
  try {
    res.render("issues", { issues });
  } catch (error) {
    console.error("Erreur lors de la récupération des issues :", error);
    res.status(500).send("Erreur serveur");
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/issues", (req, res) => {
  const { auteur, titre, description, etat } = req.body;
  issues.push({ auteur, titre, description, etat });
  res.redirect("/issues");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
