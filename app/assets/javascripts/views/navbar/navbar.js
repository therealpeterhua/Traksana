Trak.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['navbar/navbar'],
  className: 'navigation',

  events: {
    'mouseenter li.team-selection': 'toggleTeamSelectDisplay',
    'mouseleave li.team-selection': 'toggleTeamSelectDisplay'
  },

  render: function() {
    this.$el.html(this.template());
    this.addUserCorner();
    this.addTeamSelect();
    return this;
  },

  addUserCorner: function() {
    var userCornerView = new Trak.Views.UserCorner();
    this.addSubview('div.user-container', userCornerView);
  },

  addTeamSelect: function() {
    var teamSelect = new Trak.Views.TeamSelect();
    this.addSubview('div.team-select-container', teamSelect);
  },

  toggleTeamSelectDisplay: function(e) {
    this.$('ul.team-select-items').toggleClass('hidder');
    this.$('li.team-selection').toggleClass('active');
  }
})
