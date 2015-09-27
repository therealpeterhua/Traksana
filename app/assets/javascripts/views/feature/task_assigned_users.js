Trak.Views.AssignedUsers = Backbone.View.extend({
  template: JST['feature/task_assigned_users'],
  tagName: 'ul',
  className: 'task-assignment-items',
  events: {
    'click': 'assignTask',
  },

  initialize: function() {
    //pass in task as this.model here
    this.listenTo(this.model.assignedUsers(), 'sync change add remove', this.render);
    //PH - sync !== add or remove
  },

  render: function() {
    var content = this.template({ users: this.model.assignedUsers() })
    this.$el.html(content);

    return this;
  },

  assignTask: function(e) {
    var assignmentModal = new Trak.Views.Assignment({ model: this.model });
    Trak.masterView.showAndSwapModal(assignmentModal);
  },
})
