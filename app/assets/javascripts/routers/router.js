Trak.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection;
    //PH - why always use generic names rather than model/collection names
    this.$rootEl = options.$rootEl;
    this.collection.fetch();
    //PH - is this good place to put collection fetch?
  },

  routes: {
    "": "teamIndex",
    "teams/:id": "teamShow",
    "teams/:id/edit": "edit"
  },

  teamIndex: function() {
    var indexView = new Trak.Views.TeamsIndex({collection: this.collection});
    //PH - REM TeamsIndex plural
    this._swapRootView(indexView);
  },

  teamShow: function(id) {
    var showTeam = this.collection.getOrFetch(id);
    var showView = new Trak.Views.TeamShow({model: showTeam});

    this._swapRootView(showView);
  },

  // edit: function(id) {
  //   var editTeam = this.collection.getOrFetch(id);
  //   var editView = new Trak.Views.TeamForm({
  //     collection: this.collection,
  //     model: editTeam
  //   });
  //
  //   this._swapRootView(editView);
  // },

  _swapRootView: function(view) {
    this._rootView && this._rootView.remove();
    this._rootView = view;
    this.$rootEl.html(this._rootView.render().$el);
  },

  _swapCenter: function(view) {
    this._centerView && this._centerView.remove();
    this._centerView = view;
    this.$("content.centerpiece").html(this._centerView.render().$el);
  },

  _swapFeature: function(view) {
    this._featureView && this._featureView.remove();
    this._featureView = view;
    this.$("content.feature").html(this._featureView.render().$el);
  }
})
