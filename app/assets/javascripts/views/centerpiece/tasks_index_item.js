Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'task-item',

  events: {
    'submit form': 'commitEdits',
    'click': 'showTask',
    'mouseenter': 'toggleIcons',
    'mouseleave': 'toggleIcons',
  },

  initialize: function() {
    this.$el.data('task-id', this.model.id);
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(
      this.model.assignedUsers(),
      "sync change add remove",
      this.render
    );
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.checkCompletion();
    this.checkClicked();
    this.checkAssignments();

    return this;
  },

  checkCompletion: function() {
    if (this.model.escape('completer_id')) {
      this.$('.completion-icon').text('✓');
      this.$('.completion-icon').addClass('completed');
    }
  },

  checkClicked: function() {
    if (this.$el.hasClass('clicked-task')) {
      this.$('input').caret(this._caretPosition);
      this.$('.icon').removeClass('transparent');
    }
  },

  checkAssignments: function() {
    var assignedUsers = this.model.assignedUsers();

    if (assignedUsers.models.length !== 0) {
      var icon = this.$('div.assignment-icon.icon');
      icon.text('');
      var userAvatar = Trak.Utils.userAvatar(assignedUsers.first())
      icon.append(userAvatar)
          .addClass('has-assigned')
          .removeClass('transparent');
    }
  },

  commitEdits: function(e) {
    e.preventDefault();

    var attributes = this.$('form').serializeJSON().task;
    this.model.set(attributes);
    this._caretPosition = this.$('input').caret();

    this.model.save({}, {});
  },

  switchCompletion: function() {
    if (this.model.escape('completer_id')) {
      this.model.set({ completer_id: null });
    } else {
      this.model.set({ completer_id: Trak.currentUser.id });
    }
  },

  showTask: function(e) {
    this._caretPosition = this.$('input').caret();
    this.model.fetch({
      success: function() {
        Trak.masterView.displayTask(this.model);
        this.$el.trigger('taskClicked');
      }.bind(this)
    });
  },

  toggleIcons: function(e) {
    var $ct = $(e.currentTarget);

    if ($ct.hasClass('clicked-task')) {
      return;
    } else {
      this.$('div.completion-icon').toggleClass('transparent');
      if (this.$('div.assignment-icon').hasClass('has-assigned')) {
        return;
      }
      this.$('div.assignment-icon, div.deletion-icon')
            .toggleClass('transparent');
    }
  },

})
