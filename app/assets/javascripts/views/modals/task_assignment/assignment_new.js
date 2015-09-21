Trak.Views.AssignmentNew = Backbone.View.extend({
  template: JST['modals/task_assignment/assignment_new'],

  events: {

  },

  initialize: function() {
    this.collection: Trak.currentUser.coworkers();
  }),

  render: function() {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
  }

})
