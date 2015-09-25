Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'task-item',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
    'blur': 'commitEdits',
    // 'blur input': 'commitEdits'     // PH - uncomment for CRAZYTOWN
    'click': 'showTask',
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
    this.checkClicked();

    return this;
  },

  checkCompletion: function() {
    if (this.model.escape('completer_id')) {
      this.$('.completion-icon').text('✓');
      this.$('.completion-icon').addClass('completed');
    }
    //PH** will probably need this for other things where completed is a different display?
  },

  checkClicked: function() {
    if (this.$el.hasClass('clicked-task')) {
      this.$('input').caret(this._caretPosition)
    }
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
  },

  showTask: function(e) {
    this._caretPosition = this.$('input').caret();
    this.model.fetch({
      success: function() {
        Trak.masterView.displayTask(this.model);
        this.$el.trigger('taskClicked');
      }.bind(this)
    })
  },

})
