Trak.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['centerpiece/tasks_index'],
  className: 'tasks-index',

  events: {
    //PH** - listen to the filter to get working here
    //Can have ALL by default -- have a hash to know which classes to apply "hidden" characteristic to
    //Makes sense to have up here -- can select all inside <li>, attach class
  },

  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
  },

  render: function() {
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
  }
})
