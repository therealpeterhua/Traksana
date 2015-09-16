Trak.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects/projects_index_item'],
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({project: this.model});
    this.$el.html(content);

    return this;
  }
})
