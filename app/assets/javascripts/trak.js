window.Trak = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Trak.teams = new Trak.Collections.Teams();
    new Trak.Routers.Router({
      $rootEl: $("div#main"),
      collection: Trak.teams
    })

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trak.initialize();
});
