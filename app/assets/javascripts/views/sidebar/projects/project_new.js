Trak.Views.ProjectNew = Backbone.View.extend({
  template: JST['sidebar/projects/project_new'],

  events: {
    'click button.reveal-form': 'toggleInputables',
    'click form.new-project button': 'submitNewProject'
  },

  render: function() {
    var content = this.template({project: this.model});
    this.$el.html(content);

    return this;
  },

  toggleInputables: function(e) {
    e.preventDefault();
    this.$('button.reveal-form').toggleClass('hidden');
    this.$('form.new-project').toggleClass('hidden');
  },

  submitNewProject: function(e) {
    e.preventDefault();
    var formData = this.$('form.new-project').serializeJSON().project;
    this.model.set(formData);

    this.model.save({}, {
      success: function(model) {
        this.collection.add(model, {merge: true});
        this.toggleInputables;
      }.bind(this),
      error: function() {
        alert("Ruh roh, something went wrong!");
      }
    });
  }
})
