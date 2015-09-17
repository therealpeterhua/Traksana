Trak.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['centerpiece/tasks_index_item'],
  tagName: 'li',
  className: 'task-item',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
  },

  initialize: function() {
    this.$el.data('task-id', this.model.id);
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.checkCompletion;

    return this;
  },

  checkCompletion: function() {
    if (this.model.completer_id) {
      this.$('.task-completion').text('✓') //U+2713
      this.$('.completion').addClass('completed');
    }
    //PH** will probably need this for other things where completed is a different display?
  }

})
