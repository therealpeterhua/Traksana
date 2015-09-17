Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    //PH** - listen to the filter to get working here
    //Can have ALL by default -- have a hash to know which classes to apply "hidden" characteristic to
    //Makes sense to have up here -- can select all inside <li>, attach class
    'click .task-completion': 'toggleCompletion'
  },

  initialize: function(options) {
    this.projectId = options.projectId;
    this.listenTo(this.collection, "sync", this.render);
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
      this.addSubview("ul.task-items", taskItemView);
    }.bind(this));

    var newTaskView = new Trak.Views.TaskNew({
      model: new Trak.Models.Task({ project_id: this.projectId }),
      collection: this.collection,
    });
    this.addSubview("ul.task-items", newTaskView);

    //PH - should I be adding this into ul.task-items as an li? I can prepend the addSubviews rather than append...
  },

  toggleCompletion: function(e) {
    var taskId = $(e.currentTarget).parent().data('task-id');
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
  }
})
