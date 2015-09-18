Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'task-item',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
    'submit': 'commitEdits',
    // 'blur input': 'commitEdits'     // PH - uncomment for CRAZYTOWN
  },

  initialize: function() {
    this.$el.data('task-id', this.model.id);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    console.log("triggered task item render")
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.checkCompletion();

    return this;
  },

  checkCompletion: function() {
    if (this.model.escape('completer_id')) {
      this.$('.task-completion').text('✓') //U+2713
      this.$('.task-completion').addClass('completed');
    }
    //PH** will probably need this for other things where completed is a different display?
  },

  commitEdits: function(e) {
    e.preventDefault();

    var attributes = this.$('form').serializeJSON().task;
    this.model.set(attributes);

    this.model.save({}, {
      success: function() {
        alert('successful edit!');
      },
      error: function() {
        alert('ruh roh, something went wrong');
      }
    });
  }

})
