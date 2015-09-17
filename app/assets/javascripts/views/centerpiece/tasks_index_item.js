Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el

    'click strong.task-completion': 'completeTask'
    //PH** - keep here or put outside, where want to implement?
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    return this;
  },

  completeTask: function() {

  },
})
