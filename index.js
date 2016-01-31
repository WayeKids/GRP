/* On initialiser tout les modules*/

//module express
var express = require('express');
var app = express();
//module pour la gestion des cookies
var session = require('cookie-session');
//générateur de template
var swig = require('swig');
//Pour les données des formulaires
var bodyParser = require('body-parser');
//connexion à la base de données
var co = require('./app/config/dev.js');
//Module utilisateur
var ModelUser = require('./src/Domain/user.js');
//Module news
var ModelNews = require('./src/Domain/news.js');
//variable de session user
var coUser;

//Dossier lorsqu'un chemin n'est pas indiqué pour les fichier html
app.use(express.static('public'));

//Initialise bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

//Initialise swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', 'views');

//Initialise le module session
app.use(session({secret: 'azerty1230'}));

//Log pour les chemin lors de l'appelle d'une routes;
app.use(function (req, res, next) {
  console.log('Methode: ' +req.method);
  console.log('url: ' +req.url);
  next();
});

//Acceuil
app.get('/', function (req, res) {
  res.render('home', {
    title: 'Acceuil',
    session: coUser
  })
});

//Get page d'inscription
app.get('/signup', function (req, res) {
  res.render('signup', {
    title: 'Inscription'
  })
});

//Post page d'inscription
app.post('/signup', function (req, res) {
  //variable pour récupérer les données du formulaires
  var u = req.body;
  //données à poster
  var post = {alias: u.alias, mail: u.mail, nom: "", prenom: "", password: u.password, connected: 0};
  //Requete SQL
  co.query('INSERT INTO Utilisateurs SET ?', post, function (err) {
    //Si erreur loguer l'erreur
    if(err) {
      console.log(err);
      res.redirect('/signup');
    }
    //Sinon on renvoie à la page success
    else {
      res.render('success', {
        session: coUser
      });
    }
  });
});

//Get page de connexion
app.get('/login', function (req, res) {
  res.render('login', {
    title: 'Connextion'
  })
});

//Post page de connexion
app.post('/login', function (req, res) {
  //Crée un nouvel utilisateur
  var u = new ModelUser();
  var form = req.body;
  //Données à poster
  var post = [form.alias, form.password];
  //Requete
  co.query('SELECT * FROM Utilisateurs WHERE alias = ? and password = ?', post, function (err, row) {
    if(err) {
      //Si erreur on la logue et on renvoie à la page de connexion
      res.redirect('/login');
    }
    else if(row.length > 0){
      //On met la variable connecté
      //Tableau pour récupérer les données de la BDD
      var tab = [];
      for(var x in row[0]) {
        tab.push(row[0][x]);
      }
      //On les ajoute mtn à notre object user
      for(var i=0; i<tab.length; i++) {
        switch (i) {
          case 0:
            u.setId(tab[i]);
            break;
          case 1:
            u.setAlias(tab[i]);
            break;
          case 2:
            u.setMail(tab[i]);
            break;
          case 3:
            u.setNom(tab[i]);
            break;
          case 4:
            u.setPrenom(tab[i]);
            break;
          case 5:
            u.setPassword(tab[i]);
            break;
          default:
            u.setConnected(tab[i]);
            break;
        }
      }
      //On met tout dans la variable de session
      req.session.user = u;
      coUser = req.session;
      //Nouvel données pour mettre à jour le statut en ligne de l'utilisateur
      var post = [u.getAlias()];
      //On met le booléen à 1 comme quoi il est connecté
      co.query('UPDATE Utilisateurs SET connected=1 WHERE alias= ?;', post, function (err) {
        if (err) {
          console.log(err);
        }
      })
      res.render('success', {
        session: coUser
      });
    }
    else {
      res.redirect('/login');
    }
  });
});

//Get Logout
app.get('/logout', function (req, res) {
  //Données à poster
  var post = [coUser.user.getAlias()];
  //Lors de la déconnexion on met le champs connecté de l'user courant à 0
  co.query('UPDATE Utilisateurs SET connected=0 WHERE alias= ?;', post, function (err) {
    if (err) {
      console.log(err);
    }
  })
  coUser = null;
  res.render('logout', {
    title: 'Déconnecté'
  })
});

//Get News
app.get('/viewNews', function (req, res) {
  res.render('viewNews', {
    session: coUser
  })
});

//Get WriteANew
app.get('/writeANew', function (req, res) {
  co.query('SELECT * FROM Sujets', function (err, row) {

  })
  res.render('writeANew', {
    session: coUser
  })
});

//Post WriteANew
app.post('/writeANew', function (req, res) {
  //Données de formulaires
  var a = req.body;
  //Données à poster
  var post = {titre: a.titre, article: a.article, alias: coUser.user.getAlias()};
  //Requete
  co.query('INSERT INTO Sujets SET ?', post, function (err) {
    if (err) {
      //Si erreur
      console.log(err);
      res.redirect('/writeANew');
    }
    else {
      res.render('successAdd', {
        session: coUser
      });
    }
  })
})

//Si aucune routes
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, 'Page inexistante');
});

app.listen(4000);
