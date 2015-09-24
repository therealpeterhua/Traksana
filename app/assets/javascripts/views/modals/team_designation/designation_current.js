Trak.Views.DesignationCurrent = Backbone.View.extend({
  template: JST['modals/team_designation/designation_current'],
  className: 'current-members-container',

  events: {
    'click .delete-designation': 'deleteDesignation',
  },

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function() {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
  },

  deleteDesignation: function(e) {
    var userId = $(e.currentTarget).data('user-id');
    var user = this.collection.get(userId);
    this.collection.remove(user);
  },

})
