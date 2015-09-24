Trak.Views.Designation = Backbone.CompositeView.extend({
  template: JST['modals/team_designation/designation'],

  initialize: function() {
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);
    this.populateSubviews();

    return this;
  },

  populateSubviews: function() {
    var designationNewView
  },
})
