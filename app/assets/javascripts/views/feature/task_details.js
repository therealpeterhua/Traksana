Trak.Views.TaskDetails = Backbone.View.extend({
  template: JST['feature/task_details'],
  className: 'task-details',

  events: {
    //PH** - handle blank description here
    'blur textarea': 'commitEdits',
    'submit': 'disableDefaultSubmit',
    'click #feature-task-description': 'hideGuide'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.checkShowGuide();

    return this;
  },

  commitEdits: function(e) {
    var form = $(e.currentTarget).parent();
    var attributes = form.serializeJSON().task;
    var chgAttr = Object.keys(attributes)[0];

    if (chgAttr === 'description' && !attributes[chgAttr]) {
      this.checkShowGuide({ forceShow: true })
    }
    //PH - need do this before, because success callback not reached if model is already blank

    if (this.model.escape(chgAttr) !== attributes[chgAttr]) {
      this.model.set(attributes);
      this.model.save({}, {
        success: function() {
          alert('Edits successful');
        }
      });;
    }
  },

  hideGuide: function(e) {
    if ( $(e.currentTarget).hasClass('blank-description') ) {
      $(e.currentTarget).text('').removeClass('blank-description');
    }
  },

  checkShowGuide: function(options) {
    if ( !this.model.escape('description') || options.forceShow) {
      this.$('textarea#feature-task-description')
        .addClass('blank-description')
        .text('Description...');
    }
  },

  disableDefaultSubmit: function(e) {
    e.preventDefault();
  }
})
