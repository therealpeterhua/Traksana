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
//PH - should initialize in the html instead? does it matter?
//want the fetched teams to be only for the current user (so don't want this to load at sign-in page?)
//PH** Do need this on root page, which doesn't even load without user login
