Trak.Views.Master = Backbone.CompositeView.extend({
  template: JST['master/master'],
  className: 'master',

  events: {
    'click li.team-select-item': 'switchTeam',
    'click div.modal': 'toggleModal',
    'click div.modal > div': 'stopPropagation'
  },
  //PH -- NO LISTENERS HERE. can't afford to repaint whole page. Just a command center/battle station to render rest of site

  render: function() {
    this.$el.html( this.template() )
    this.populateSidebar();
    this.populateNavbar();
    this.displayTitlebar();       //display not populate b/c swap out views here
    return this;
  },

  populateSidebar: function() {
    var sidebarView = new Trak.Views.Sidebar({
      model: this.model
    });
    this.addSubview('.sidebar', sidebarView);
  },
  //PH - we have the team as model here

  populateNavbar: function() {
    var navbarView = new Trak.Views.Navbar()
    this.addSubview('.navbar', navbarView);
  },

  displayTitlebar: function() {
    var titlebarView = new Trak.Views.Titlebar({
      currTeamMoniker: this.model.escape('moniker'),
      //PH**** - change this when you switch around the team view
      model: this._currentProject
      //PH** - case currProj - if non-existent, just give it the current team name
      //PH**** - you have to clear this._currentProject when you CLICK my_tasks!, AND you gotta render this again at that time
    });
    //PH** have a thing here that tells it to put the title as "Peter's Regular Joe tasks"!
    this.swapTitlebar(titlebarView);
  },

  switchTeam: function(e) {
    var teamId = $(e.currentTarget).data('team-id');
    this._currentTeam = Trak.teams.getOrFetch(teamId);
    //PH** call this.render again, or set the sidebar, titlebar, and main content here manually
    //PH** how to initialize? Have every user start with their PERSONAL workspace? And always log into that one?
  },

  displayProject: function(project) {
    this._currentProject = project
    this.displayTitlebar();

    var projectShowView = new Trak.Views.ProjectShow({
      model: project
    });

    this.revealCenter(true)
      .revealFeature(false)
      .showSinglePane(false);

    this.swapCenterView(projectShowView);
  },

  displayTask: function(task) {
    var taskShowView = new Trak.Views.TaskShow({
      model: task
    });

    this.revealFeature(true).showSinglePane(false)
    this.swapFeatureView(taskShowView);
  },

  swapTitlebar: function(view) {
    this._titlebarView && this._titlebarView.remove();
    this._titlebarView = view;
    this.$("section.titlebar").html(this._titlebarView.render().$el);
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

  showSinglePane: function(bool) {
    if (bool) {
      this.$('section.centerpiece').addClass('single-pane');
    } else {
      this.$('section.centerpiece').removeClass('single-pane');
    }
    return this;
  },

  revealCenter: function(bool) {
    if (bool) {
      this.$('section.centerpiece').removeClass('hidden');
    } else {
      this.$('section.centerpiece').addClass('hidden');
    }

    return this;
  },

  revealFeature: function(bool) {
    var that = this;
    var $feature = that.$('section.feature');

    if (bool) {
      $feature.off('transitionend');

      $feature.removeClass('zero-height');
      $feature.removeClass('transitioning');
      $feature.one('transitionend', function() {

        $feature.one('transitionend', function() {
          $feature.addClass('zero-height');
        });
        //set another listener once you hear a transitionEnd!

      })
    } else {
      $feature.addClass('transitioning');
        // can't do a 1-time listener because initializes to false, so you'll have an outstanding listener...
    }

    return this;
  },

  toggleModal: function() {
    this.$('.modal-cover').toggleClass('hidden');
    this.$('.modal').toggleClass('hidden');
  },

  stopPropagation: function(e) {
    console.log('stopping propagation!');
    e.stopPropagation();
  },

  showAndSwapModal: function(view) {
    this.toggleModal();
    this._modalView && this._modalView.remove();
    this._modalView = view;
    this.$('.modal').html( this._modalView.render().$el );
    //PH** - refactor this into separate method later. Shouldn't have to add/remove 2 separate things, or type this here.
  },

  //PH** - Need to revamp the listeners on Sidebar -- I'll have to fetch the team to get the associated projects (and fetch this one), which will trigger a sync on the entire sidebar object right now. Maybe have just a teams handler?
  //Remember I'll also have to keep track of which project is currently being clicked!
  //Do i have to delete subviews? I'll just keep populating the sidebar with old views here...

  //I don't need to listen to sync EVerywhere -- can just listen for changes, to what exactly is being displayed?? Clearly not the case... try adding project

  //NOTE: can always write like a cowboy -- have the click reference something OUTSIDE of the element with a raw jQuery selector, within your subviews
})
