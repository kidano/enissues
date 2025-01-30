const express = require("express");
const {body, validationResult} = require('express-validator');
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let issues = [
  {
    id: 1,
    auteur: "SamSoule",
    titre: "Problème avec EJS",
    description: "ma vue EJS ne marche pas",
    etat: "en cours",
  },
  {
    id: 2,
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
  res.render("create", { formData: {}, errors: [] });
});

//créer une nouvelle issue
app.post(
  "/issues",
  [
    body("auteur")
      .isLength({ min: 3 })
      .withMessage("L'auteur doit avoir au moins 3 caractères"),
    body("titre")
      .isLength({ min: 3 })
      .withMessage("Le titre doit avoir au moins 3 caractères"),
    body("description")
      .isLength({ min: 3 })
      .withMessage("La description doit avoir au moins 3 caractères"),
  ],
  (req, res) => {
    const errors = validationResult(req);
// Afficher les erreurs de validation
    if (!errors.isEmpty()) {
      return res.render("create", {
        formData: req.body,
        errors: errors.array()
      });
    }
    //ajouter une nouvelle issue
      issues.push({
        id: issues.length + 1,
        titre: req.body.titre,
        auteur: req.body.auteur,
        dateCreation: new Date().toLocaleDateString(),
        description: req.body.description,
        etat: "En cours",
      });
      res.redirect("/issues");
  }
);
//supprimer une issue
app.post("/issues/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  issues = issues.filter((issue) => issue.id !== id);
  res.redirect("/issues");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
