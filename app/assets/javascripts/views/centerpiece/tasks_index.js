Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    'taskClicked li': 'emphasizeTask',
    'click .task-completion > .completion-icon': 'toggleCompletion',
    'click .task-deletion > .deletion-icon': 'deleteTask',
    'click .task-assignment > .assignment-icon': 'assignTask',
  },

  initialize: function(options) {
    this.projectId = options.projectId;
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.populateTaskItems();
    this.populateNewTaskItem();

    return this;
  },

  populateTaskItems: function() {
    this.collection.each( function(task) {
      var taskItemView = new Trak.Views.TasksIndexItem({ model: task });
      this.addSubview('ul.task-items', taskItemView);
    }.bind(this));
  },

  populateNewTaskItem: function() {
    if (!this.projectId) {
      return;
    }

    var newTaskView = new Trak.Views.TaskForm({
      model: new Trak.Models.Task({ project_id: this.projectId }),
      collection: this.collection,
    });
    this.addSubview('ul.task-items', newTaskView);
  },

  emphasizeTask: function(e) {
    var $currentTarget = $(e.currentTarget);
    this.$('li').removeClass('clicked-task');
    this.$('li .icon:not(.has-assigned)').addClass('transparent');
    $currentTarget.addClass('clicked-task');
  },

  toggleCompletion: function(e) {
    var taskId = $(e.currentTarget).data('task-id');
    var task = this.collection.get(taskId);

    $.ajax({
      method: 'post',
      url: 'api/tasks/' + taskId + '/toggle_completion',
      dataType: 'json',
      success: function(response) {
        task.set(response);
        task.trigger('sync');
      }.bind(this)
    });
  },

  deleteTask: function(e) {
    var taskId = $(e.currentTarget).data('task-id');
    var task = this.collection.get(taskId);
    task.destroy({
      success: function(model, response, options) {
        this.collection.remove(model);
        this.removeModelSubview('ul.task-items', model);
      }.bind(this),
      error: function(model, response, options) {
        alert("Couldn't delete that item!");
      }
    });
  },

  assignTask: function(e) {
    var taskId = $(e.currentTarget).data('task-id');
    var task = this.collection.get(taskId);

    var assignmentModal = new Trak.Views.Assignment({
      model: task,
    });

    Trak.masterView.swapModal(assignmentModal);
  },

})
