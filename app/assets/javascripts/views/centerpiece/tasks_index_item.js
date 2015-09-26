Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'task-item',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
    'blur': 'commitEdits',
    // 'blur input': 'commitEdits'     // PH - uncomment for CRAZYTOWN
    'click': 'showTask',
    'mouseenter': 'toggleIcons',
    'mouseleave': 'toggleIcons',
  },

  initialize: function() {
    this.$el.data('task-id', this.model.id);
    this.listenTo(this.model, "sync change", this.render);
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
      this.$('input').caret(this._caretPosition);
      this.$('.icon').removeClass('transparent');
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

  switchCompletion: function() {
    if (this.model.escape('completer_id')) {
      this.model.set({ completer_id: null });
    } else {
      this.model.set({ completer_id: Trak.currentUser.id });
    }
  },
  //PH**** NEED TO MOVE EDITS HERE!!!!

  showTask: function(e) {
    this._caretPosition = this.$('input').caret();
    this.model.fetch({
      success: function() {
        Trak.masterView.displayTask(this.model);
        this.$el.trigger('taskClicked');
        //check out dat CUSTOM TRIGGER DOH
      }.bind(this)
    });
  },

  toggleIcons: function(e) {
    if ( $(e.currentTarget).hasClass('clicked-task') ) {
      return;
    }
    this.$('.icon').toggleClass('transparent');
  },

})
