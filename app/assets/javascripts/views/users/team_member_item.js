Trak.Views.TeamMemberItem = Backbone.View.extend({
  template: JST['users/team_member_item'],
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({member: this.model});
    this.$el.html(content);

    return this;
  }
})
