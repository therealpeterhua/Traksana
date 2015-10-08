Trak.Views.Titlebar = Backbone.View.extend({
  template: JST['titlebar/titlebar'],
  className: 'title',

  events: {
    'click i.edit-project': 'showProjectEditModal',
  },

  initialize: function(options) {
    this.currTeamMoniker = options.currTeamMoniker;
    if (this.model) {
      this.listenTo(this.model, 'sync', this.render);
    }

    Trak.Utils.extendModals(this);
  },

  render: function() {
    var content = this.template({
      project: this.model,
      currTeamMoniker: this.currTeamMoniker
    });
    this.$el.html(content);

    return this;
  },

  showProjectEditModal: function() {
    var projectEditView = new Trak.Views.ProjectEdit({
      model: this.model,
    });

    Trak.masterView.swapModal(projectEditView);
  },
})
