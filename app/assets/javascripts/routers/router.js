Trak.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection;
    //use generic names because that's what BB give u for free
    this.$rootEl = options.$rootEl;
    this.collection.fetch();
    //good place to have fetch, could also have in beginning
  },

  routes: {
    "": "teamIndex",
    "teams/:id": "masterShow",
  },

  teamIndex: function() {
    var indexView = new Trak.Views.TeamsIndex({ collection: this.collection });
    //PH - REM TeamsIndex plural
    this._swapView(indexView);
  },

  masterShow: function(id) {
    var showTeam = this.collection.getOrFetch(id);
    this._currentTeam = showTeam;
    var showView = new Trak.Views.Master({ model: showTeam });

    this._swapView(showView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },

})
