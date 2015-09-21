Trak.Views.AssignedUserItem = Backbone.View.extend({
  template: JST['modals/task_assignment/assigned_user_item'],
  tagName: 'li',
  className: 'assigned-user',

  render: function() {
    this.$el.data('assigned-user-id', this.model.id)
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
})
