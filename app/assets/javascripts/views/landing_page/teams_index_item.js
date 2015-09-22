Trak.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['landing_page/teams_index_item'],
  tagName: 'li',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el, *can make the team show ON the actual page itself!*
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },
})
