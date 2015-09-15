Trak.Views.TeamsIndex = Backbone.CompositeView.extend({
  //PH** - transform into composite view
  template: JST['teams/teams_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var content = this.template({teams: this.collection});
    this.$el.html(content);
    this.populateSubviews();
    //PH -- this populates subviews AFTER we've set our page $el. Otherwise, #html would wipe out.

    return this;
  },

  populateSubviews: function() {
    this.collection.each( function(team) {
      var indexItemView = new Trak.Views.TeamsIndexItem({model: team});
      this.addSubview(".team-index-items", indexItemView);
    }.bind(this));

    var newTeamView = new Trak.Views.TeamForm({
      collection: this.collection,
      model: new Trak.Models.Team()
    });

    this.addSubview("div.new-team", newTeamView);
  }
})
