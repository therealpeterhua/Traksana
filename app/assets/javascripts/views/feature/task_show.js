Trak.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['feature/task_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.populateTaskSubviews();
    this.populateCommentsSubviews();
    this.populateStoriesSubviews();

    return this;
  },

  populateTaskSubviews: function() {
    var taskDetailsView = new Trak.Views.TaskDetails({ model: this.model });
    this.addSubview('p.task-details-container', taskDetailsView);
  },

  populateCommentsSubviews: function() {
    var commentsView = new Trak.Views.Comments({
      model: this.model,
    });

    this.addSubview('div.task-comments', commentsView);
  },

  populateStoriesSubviews: function() {
    var storiesView = new Trak.Views.StoriesIndex({
      collection: this.model.stories(),
    });

    this.addSubview('div.task-stories'), storiesView);
  },
})
