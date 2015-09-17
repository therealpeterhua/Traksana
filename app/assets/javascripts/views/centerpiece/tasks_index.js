Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    //PH** - listen to the filter to get working here
    //Can have ALL by default -- have a hash to know which classes to apply "hidden" characteristic to
    //Makes sense to have up here -- can select all inside <li>, attach class
  },

  initialize: function(options) {
    this.projectId = options.projectId;
    this.listenTo(this.collection, "change", this.render);
  },

  render: function() {
    alert('tasks index render triggered');
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
  }
})
