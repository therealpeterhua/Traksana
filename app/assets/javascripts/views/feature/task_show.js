Trak.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['feature/task_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.populateTaskCommentsSubviews();

    return this;
  },

  populateTaskCommentsSubviews: function() {
    var taskDetailsView = new Trak.Views.TaskDetails({ model: this.model });
    this.addSubview('p.task-details-container', taskDetailsView);
    //populate TWO VIEWS:
    // 1) Description + Task name... if change here, should commit edits
    // 2) Comments index (which includes comments and new comment form)
  }
})
