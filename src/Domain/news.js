//Class News
function News() {
  //Attributs
  this.cde;
  this.titre;
  this.article;
  this.alias;
  //Function
  return {
    //Constructeur
    constructor: News,
    //Pour l'id
    getId : function () {
      return this.cde;
    },
    setId : function (id) {
      this.cde = id;
    },
    //Pour l'alias
    getTitre : function () {
      return this.titre;
    },
    setTitre : function (t) {
      this.titre = t;
    },
    //Pour l'article
    getArticle : function () {
      return this.article;
    },
    setArticle : function (art) {
      this.article = art;
    },
    //Pour l'alias
    getAlias : function () {
      return this.alias;
    },
    setAlias : function (a) {
      this.alias = a;
    }
  };
};

module.exports = News;
