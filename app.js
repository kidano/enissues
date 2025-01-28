const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {

    //res.render("index", { villes: villes });
    res.render("index", { "/" });
  });


  app.post("index", (req, res) => {
  
    //const ville = req.body.ville;
    //const habitant = req.body.habitant;
    const { problèmes } = req.body;
  
    //villes.push({ ville: ville, habitant: habitant });
    problèmes.push({ problèmes });
    res.redirect("/");
  });


  app.listen(port, () => {
    console.log('Le serveur tourne sur le port $ {port}');
  });

let selectProb = document.getElementById("problèmes");
// let pProb = document.getElementById("");
let divProb = document.getElementById("problèmes");

selectProb.addEventListener("change", function(){
    let index = selectProb.selectIndex;
    divProb.innerHTML = "selectIndex : " + index;
})