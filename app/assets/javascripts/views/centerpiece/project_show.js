Trak.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['centerpiece/project_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.populateSubviews();

    return this;
  },

  populateSubviews: function() {
  }
})

/* PH*****************

It used to trigger a render on team because you were fetching the team item to actually get the route to work.

The TEAM won't re-render unless you explicitly touch the team MODEL, or its members ASSOCIATIONS. Even if it does re-render, we want to confine this to its own VIEW, not allow it to repaint the whole PAGE.

You need to avoid rendering the top-level -- maybe just have it be a shell?

*/
