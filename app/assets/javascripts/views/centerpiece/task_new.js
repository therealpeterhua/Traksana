Trak.Views.TaskForm = Backbone.View.extend({
  template: JST['centerpiece/task_form'],
  tagName: 'li',
  className: 'task-form',

  events: {
    'form submit': 'submitNewTask'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  submitNewTask: function(e) {
    e.preventDefault();
    //PH -- default browser behavior puts formData into URL as query string
    var attributes = this.$('form').serializeJSON().task;
    this.model.set(attributes);

    this.model.save({}, {       //PH - REM {}
      success: function(model) {
        this.collection.add(model)
      }.bind(this),
      error: function() {
        alert("RUH ROH, something went wrong!")
      }
      //PH**** remember when there's a error you get sent back a JSON of the errors.full_messages from the controller server-side. Can display those?
    })
  }
})
