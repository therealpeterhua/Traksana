Trak.Views.TaskShow = Backbone.View.extend({
  template: JST['feature/task_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.populateTaskDetails();

    return this;
  },

  populateTaskDetails: function() {
    //populate TWO VIEWS:
    // 1) Description + Task name... if change here, should commit edits
    // 2) Comments index (which includes comments and new comment form)
  }
})
