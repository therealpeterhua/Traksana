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
    "teams/:id": "masterPage",
    // "teams/:id/edit": "edit",
    "teams/:team_id/projects/:id": "projectShow"
  },

  teamIndex: function() {
    var indexView = new Trak.Views.TeamsIndex({ collection: this.collection });
    //PH - REM TeamsIndex plural
    this._swapView(indexView);
  },

  masterPage: function(id) {
    var showTeam = this.collection.getOrFetch(id);
    var showView = new Trak.Views.Master({ model: showTeam });

    this._swapView(showView);
  },

  // projectShow: function(team_id, id) {
  //   var currTeam = this.collection.getOrFetch(team_id);
  //   var showProject = currTeam.projects().get(id);
  //   projectShowView = new Trak.Views.ProjectShow({ model: showProject })
  //
  //   this._swapCenter(projectShowView);
  // },

  // edit: function(id) {
  //   var editTeam = this.collection.getOrFetch(id);
  //   var editView = new Trak.Views.TeamForm({
  //     collection: this.collection,
  //     model: editTeam
  //   });
  //
  //   this._swapView(editView);
  // },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },

  // _swapCenter: function(view) {
  //   this._centerView && this._centerView.remove();
  //   this._centerView = view;
  //   // this.$rootEl
  //   //   .find("section.centerpiece")
  //   //   .html( this._centerView.render().$el );
  //   this.$rootEl.find("section.centerpiece").html(this._centerView.render().$el)
  // },
  //
  // _swapFeature: function(view) {
  //   this._featureView && this._featureView.remove();
  //   this._featureView = view;
  //   this.$rootEl
  //     .find("section.feature")
  //     .html( this._featureView.render().$el );
  // }
})
