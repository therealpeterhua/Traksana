Trak.Views.TaskDetails = Backbone.View.extend({
  template: JST['feature/task_details'],
  className: 'task-details',

  events: {
    //PH** - handle blank description here
    'blur textarea': 'commitEdits',
    'submit': 'disableDefaultSubmit'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    if ( !this.model.escape('description') ) {
      this.$('textarea#task-description')
        .addClass('blank-description')
        .text('Description...');
    }

    return this;
  },

  commitEdits: function(e) {
    var form = $(e.currentTarget).parent();
    var attributes = form.serializeJSON().task;
    var chgAttr = Object.keys(attributes)[0];

    if (this.model.escape(chgAttr) !== attributes[chgAttr]) {
      this.model.set(attributes);

      this.model.save({}, {
        success: function() {
          alert('Edits successful');
        }
      });
    }
  },

  disableDefaultSubmit: function(e) {
    e.preventDefault();
  }
})
