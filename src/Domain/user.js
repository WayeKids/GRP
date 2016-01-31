//Class user
function User() {
  //Attributs
  this.cde;
  this.alias;
  this.mail;
  this.nom;
  this.prenom;
  this.password;
  this.connected;
  //Function
  return {
    //Constructeur
    constructor: User,
    //Pour l'id
    getId : function () {
      return this.cde;
    },
    setId : function (id) {
      this.cde = id;
    },
    //Pour l'alias
    getAlias : function () {
      return this.alias;
    },
    setAlias : function (a) {
      this.alias = a;
    },
    //Pour l'email
    getMail : function () {
      return this.mail;
    },
    setMail : function (m) {
      this.mail = m;
    },
    //Pour le nom
    getNom : function () {
      return this.nom;
    },
    setNom : function (n) {
      this.nom = n;
    },
    //Pour le prenom
    getPrenom : function () {
      return this.prenom;
    },
    setPrenom : function (p) {
      this.prenom = p;
    },
    //Pour le mdp
    getPassword : function () {
      return this.password;
    },
    setPassword : function (pass) {
      this.password = pass;
    },
    //Pour la connexion
    getConnected : function () {
      return this.connected;
    },
    setConnected : function (co) {
      this.connected = co;
    },
  };
};

module.exports = User;
