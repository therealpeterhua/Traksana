Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    //PH** - listen to the filter to get working here
    //Can have ALL by default -- have a hash to know which classes to apply "hidden" characteristic to
    //Makes sense to have up here -- can select all child <li>, attach class
    'taskClicked li': 'emphasizeTask',
    'click .task-completion > .completion-icon': 'toggleCompletion',
    'click .task-deletion > .deletion-icon': 'deleteTask',
    'click .task-assignment > .assignment-icon': 'assignTask',
  },

  initialize: function(options) {
    this.projectId = options.projectId;
    this.listenTo(this.collection, "add remove", this.render);
    //PH - I've removed sync here.. we only fetch from the server at loadup of the team master page anyway -- all this does is catch bubbled-up events from the feature fetch, which re-renders the section and kills focus/emphasized elements.
  },

  render: function() {
    console.log("triggered task index render");
    // alert('tasks index render triggered');
    var content = this.template();
    this.$el.html(content);
    this.populateTaskItems();

    return this;
  },

  populateTaskItems: function() {
    this.collection.each( function(task) {
      var taskItemView = new Trak.Views.TasksIndexItem({ model: task });
      this.addSubview('ul.task-items', taskItemView);
    }.bind(this));

    var newTaskView = new Trak.Views.TaskForm({
      model: new Trak.Models.Task({ project_id: this.projectId }),
      collection: this.collection,
    });
    this.addSubview('ul.task-items', newTaskView);

    //PH - should I be adding this into ul.task-items as an li? I can prepend the addSubviews rather than append...
  },

  emphasizeTask: function(e) {
    var $currentTarget = $(e.currentTarget);
    this.$('li').removeClass('clicked-task');
    this.$('li .icon').addClass('transparent');
    $currentTarget.addClass('clicked-task');
  },

  toggleCompletion: function(e) {
    var taskId = $(e.currentTarget).data('task-id');
    var task = this.collection.get(taskId); //PH** SEND CUSTOM AJAX TO MARK!

    $.ajax({
      method: 'post',
      url: 'api/tasks/' + taskId + '/toggle_completion',
      dataType: 'json',
      success: function(response) {
        task.set(response);
        task.trigger('sync');
      }.bind(this)
    })
    //PH** grab task here, don't re-render feature pane, have master.js to that via listener
    //completion will automatically trigger a re-render here -- you want that behavior --> maybe have a slideout animation for completed tasks
    //if you want animations -- this method's the place for them
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
    //see if you can find out what the model is after deletion, so you can remove it from the collection AND from the view(find subview by model);
  },

  assignTask: function(e) {
    var taskId = $(e.currentTarget).data('task-id');
    var task = this.collection.get(taskId);

    var assignmentModal = new Trak.Views.Assignment({
      model: task,
      collection: task.assignedUsers()
    });

    Trak.masterView.showAndSwapModal(assignmentModal);
  },

})
