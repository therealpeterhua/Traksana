Trak.Views.Master = Backbone.CompositeView.extend({
  template: JST['master/master'],
  className: 'master',

  events: {
    "click ul.project-items>li": "displayProject"
  },

  //PH -- NO LISTENERS HERE. can't afford to repaint whole page

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
  //PH** - add other panes same way? May have to display piecemeal

  displayProject: function() {
    //PH** - Need to revamp the listeners on Sidebar -- I'll have to fetch the team to get the associated projects (and fetch this one), which will trigger a sync on the entire sidebar object right now.
    //Remember I'll also have to keep track of which project is currently being clicked!
    //Do i have to delete subviews? I'll just keep populating the sidebar with old views here...
  }
})
