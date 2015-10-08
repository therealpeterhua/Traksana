Trak.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['teams_page/teams_index_item'],
  tagName: 'li',

  events: {
    "mouseenter": "toggleHovered",
    "mouseleave": "toggleHovered",
    "mouseDown a": "toggleClicked",
    "mouseUp a": "toggleClicked",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  toggleHovered: function(e) {
    this.$el.toggleClass('hovered');
  },

  toggleClicked: function(e) {
    this.$el.toggleClass('clicked');
  },

})
