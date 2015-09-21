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
    this.$('input').val('New task here, hit return to submit...')

    return this;
  },

  submitNewTask: function(e) {
    e.preventDefault();
    //PH -- default browser behavior puts formData into URL as query string
    var attributes = this.$('form').serializeJSON().task;
    this.model.set(attributes);

    this.model.save({}, {       //PH - REM {}
      success: function(model) {
        debugger;
        this.collection.add(model);
        // this.collection.trigger('sync');
      }.bind(this),
      error: function() {
        alert("RUH ROH, something went wrong!")
      }
      //PH**** remember when there's a error you get sent back a JSON of the errors.full_messages from the controller server-side. Can display those?
    })
  }
})
