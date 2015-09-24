Trak.Views.TeamMemberIndex = Backbone.CompositeView.extend({
  template: JST['sidebar/team/team_member_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render)
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.addMemberViews();

    return this;
  },

  addMemberViews: function() {
    this.collection.each( function(member) {
      var teamMemberView = new Trak.Views.TeamMemberItem({
        model: member
      });

      this.addSubview("ul.team-member-items", teamMemberView);
    }.bind(this) );
  },

})
