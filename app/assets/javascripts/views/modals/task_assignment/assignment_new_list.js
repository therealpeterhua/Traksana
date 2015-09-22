Trak.Views.AssignmentNewList = Backbone.View.extend({
  template: JST['modals/task_assignment/assignment_new_list'],
  tagName: 'ul',
  className: 'new-assigned-user-items',

  render: function() {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
  },
})
