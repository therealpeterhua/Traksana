Trak.Views.Master = Backbone.CompositeView.extend({
  template: JST['master/master'],
  className: 'master',

  events: {
    'click li.team-select-item': 'switchTeam',
    'projectDelete': 'resetMainPanes',
  },

  initialize: function() {
    Trak.Utils.extendModals(this);
  },

  render: function() {
    this.$el.html( this.template() );
    this.populateSidebar();
    this.populateNavbar();
    this.displayTitlebar();
    return this;
  },

  populateSidebar: function() {
    var sidebarView = new Trak.Views.Sidebar({
      model: this.model
    });
    this.addSubview('.sidebar', sidebarView);
  },

  populateNavbar: function() {
    var navbarView = new Trak.Views.Navbar()
    this.addSubview('.navbar', navbarView);
  },

  displayTitlebar: function() {
    var titlebarView = new Trak.Views.Titlebar({
      currTeamMoniker: this.model.escape('moniker'),
      model: this._currentProject
    });
    this.swapTitlebar(titlebarView);
  },

  switchTeam: function(e) {
    var teamId = $(e.currentTarget).data('team-id');
    this._currentTeam = Trak.teams.getOrFetch(teamId);
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
      $feature.on('transitionend', function(e) {
        if ( $feature.hasClass('transitioning') ) {
          $feature.addClass('zero-height');
        }
      });
    } else {
      $feature.addClass('transitioning');
    }

    return this;
  },

  resetMainPanes: function() {
    this.revealCenter(false).revealFeature(false);
    this._currentProject = false;
    this.displayTitlebar();
  },
})
