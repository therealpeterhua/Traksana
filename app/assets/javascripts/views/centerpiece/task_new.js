Trak.Views.TaskForm = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'new-task',

  events: {
    'submit form': 'submitNewTask'
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    return this;
  },

  submitNewTask: function(e) {
    e.preventDefault();

    var attributes = this.$('form').serializeJSON().task;
    this.model.set(attributes);

    this.model.save({}, {
      success: function(model) {
        this.collection.add(model);
      }.bind(this),
      error: function() {
        alert("Something went wrong while submitting new task.")
      }
    })
  },
})
