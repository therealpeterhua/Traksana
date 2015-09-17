Trak.Views.Master = Backbone.CompositeView.extend({
  template: JST['master/master'],
  className: 'master',

  events: {
    "click ul.project-items>li": "displayProject"
  },

  //PH -- NO LISTENERS HERE. can't afford to repaint whole page. Just a command center/battle station to render rest of site

  render: function() {
    this.$el.html( this.template() )
    this.populateSidebar();

    return this;
  },

  populateSidebar: function() {
    var sidebarView = new Trak.Views.Sidebar({
      model: this.model
    });
    this.addSubview('.sidebar', sidebarView);
  },
  //PH - we have the team as model here
  //PH** - add other panes same way? Maybe not -- maybe gotta show piecemeal

  displayProject: function(e) {
    e.preventDefault();
    var projectId = $(e.currentTarget).data('project-id')
    var proj = this.model.projects().get(projectId);

    projectShowView = new Trak.Views.ProjectShow({
      model: proj
    });

    // this.switchToDualPane();       //PH** - should I do this implementation and just use 2 panes rather than 3 and selectively hiding?
    this.switchToDualPane();
    this.clearMainContainer();    //PH - how to clear all views outta main container?
    this.swapCenterView(projectShowView);
    //PH - we'll probably need this to set a project so that the "feature" view will remember it!
  },

  switchToDualPane: function() {
    this.$("section.centerpiece").removeClass('hidden');
    this.$("section.feature").removeClass('hidden');
    this.$("section.single-pane").addClass('hidden');
  },

  switchToSinglePane: function() {
    this.$("section.centerpiece").addClass('hidden');
    this.$("section.feature").addClass('hidden');
    this.$("section.single-pane").removeClass('hidden');
  },

  swapCenterView: function(view) {
    this._centerView && this._centerView.remove();
    this._centerView = view;
    this.$("section.centerpiece").html(this._centerView.render().$el);
  },
  //PH -- can i dry this out?? have a function that swaps with a selector??

  swapFeatureView: function(view) {
    this._featureView && this._featureView.remove();
    this._featureView = view;
    this.$("section.feature").html(this._featureView.render().$el);
  },

  swapSinglePaneView: function(view) {
    this._singleView && this._singleView.remove();
    this._singleView = view;
    this.$("section.single-pane").html(this._singleView.render().$el);
  },

  clearMainContainer: function() {
    this._centerView && this._centerView.remove();
    this._featureView && this._featureView.remove();
    this.$("section.centerpiece").html('');
    this.$("section.feature").html('');
  },
  //PH** - Need to revamp the listeners on Sidebar -- I'll have to fetch the team to get the associated projects (and fetch this one), which will trigger a sync on the entire sidebar object right now. Maybe have just a teams handler?
  //Remember I'll also have to keep track of which project is currently being clicked!
  //Do i have to delete subviews? I'll just keep populating the sidebar with old views here...

  //I don't need to listen to sync EVerywhere -- can just listen for changes, to what exactly is being displayed?? Clearly not the case... try adding project

  //NOTE: can always write like a cowboy -- have the click reference something OUTSIDE of the element with a raw jQuery selector, within your subviews

  displayTask: function(e) {
    e.preventDefault();
  }
})
