Trak.Views.TeamsIndex = Backbone.CompositeView.extend({
  //PH** - transform into composite view
  template: JST['teams_page/teams_index'],
  className: 'teams-index group',

  events: {
    'click button': 'showTeamCreationModal',
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    Trak.Utils.extendModals(this);
  },

  render: function() {
    var content = this.template({teams: this.collection});
    this.$el.html(content);
    this.populateSubviews();

    return this;
  },

  populateSubviews: function() {
    this.collection.each( function(team) {
      var teamItemView = new Trak.Views.TeamsIndexItem({model: team});
      this.addSubview(".teams-index-items", teamItemView);
    }.bind(this));
  },

  showTeamCreationModal: function(e) {
    e.preventDefault();
    var teamCreationModal = new Trak.Views.TeamForm({
      collection: this.collection,
      model: new Trak.Models.Team(),
    });
    this.swapModal(teamCreationModal);
    $.rails.refreshCSRFTokens();
  },
})
