Trak.Views.Assignment = Backbone.CompositeView.extend({
  template: JST['modals/assignment'],

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    return this;
  }
})
