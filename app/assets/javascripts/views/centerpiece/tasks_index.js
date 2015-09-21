Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    //PH** - listen to the filter to get working here
    //Can have ALL by default -- have a hash to know which classes to apply "hidden" characteristic to
    //Makes sense to have up here -- can select all child <li>, attach class
    'click input.task-title-input': 'emphasizeTask',
    'click .task-completion > .completion-icon': 'toggleCompletion',
    'click .task-deletion > .deletion-icon': 'deleteTask',
    'click .task-assignment > .assignment-icon': 'assignTask'
  },

  initialize: function(options) {
    this.projectId = options.projectId;
    this.listenTo(this.collection, "sync remove", this.render);
    //PH - remember NEED the remove listener here, else doesn't sync with deleting new items you just added
    this.listenTo(this.collection, "clearEdits", this.clearEdits)
    //PH**** - this is to clear out everything -- handle others INSIDE the task_index_item
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
    this.$('li').removeClass('clicked-task');
    $(e.currentTarget).parent().parent().addClass('clicked-task');
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
    // $('div.modal-cover').removeClass('hidden');
    // $('div.modal-cover').addClass('active');
    //PH** - refactor this into separate method later. Shouldn't have to add/remove 2 separate things, or type this here.
    var task = this.collection.get(taskId);

    var assignmentModal = new Trak.Views.Assignment({
      model: task
    });

    Trak.masterView.showAndSwapModal(assignmentModal);
  }

})
