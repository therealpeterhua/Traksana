Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    return this;
  }
})
