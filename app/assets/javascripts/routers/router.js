Trak.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection;
    //PH - why always use generic names rather than model/collection names
    this.$rootEl = options.$rootEl;
    this.collection.fetch();
    //PH - is this good place to put collection fetch?
  },

  routes: {
    "": "index",
    "teams/new": "new",
    "teams/:id": "show",
    "teams/:id/edit": "edit"
  },

  index: function() {
    var indexView = new Trak.Views.TeamsIndex({collection: this.collection});
    //PH - REM TeamsIndex plural
    this._swapView(indexView);
  },

  new: function() {
    var newTeam = new Trak.Models.Team();
    var newView = new Trak.Views.TeamForm({
      collection: this.collection,
      model: newTeam
    });

    this._swapView(newView);
  },

  show: function(id) {
    var showTeam = this.collection.getOrFetch(id);
    var showView = new Trak.Views.TeamShow({model: showTeam});

    this._swapView(showView);
  },

  edit: function(id) {
    var editTeam = this.collection.getOrFetch(id);
    var editView = new Trak.Views.TeamForm({
      collection: this.collection,
      model: editTeam
    });

    this._swapView(editView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
})
