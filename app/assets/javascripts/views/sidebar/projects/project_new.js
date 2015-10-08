Trak.Views.ProjectNew = Backbone.View.extend({
  template: JST['sidebar/projects/project_new'],

  events: {
    'click button.reveal-form': 'toggleInputables',
    'click div.close-form': 'toggleInputables',
    'click form.new-project button': 'submitNewProject',
  },

  render: function() {
    var content = this.template({project: this.model});
    this.$el.html(content);

    return this;
  },

  toggleInputables: function() {
    this.$('div.new-project-reveal').toggleClass('activated');
    var $transitionEl = this.$('div.new-project-transition')

    if ( $transitionEl.hasClass('zero-width') ) {
      $transitionEl.removeClass('zero-width')
      $transitionEl.find('input').focus();
    } else {
      $transitionEl.addClass('zero-width')
    }
  },

  submitNewProject: function(e) {
    e.preventDefault();
    var formData = this.$('form.new-project').serializeJSON().project;
    this.model.set(formData);

    this.model.save({}, {
      success: function(model) {
        this.collection.add(model, {merge: true});
        this.toggleInputables();

        this.model = new Trak.Models.Project({
          team_id: model.escape('team_id')
        });
      }.bind(this),
      error: function() {
        alert("Something went wrong while submitting new project.");
      }
    });
  },
})
