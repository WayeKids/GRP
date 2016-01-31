//module pour la connexion à la base de données
var mysql = require('mysql');

//On crée la connexion
var connexion = mysql.createConnection({
  host     : "mysql1.alwaysdata.com",
  user     : "grpsocial",
  password : "Maganon12@,",
  database : "grpsocial_appli",
  charset : "utf8"
});

//On exporte la connexion
module.exports = connexion;
