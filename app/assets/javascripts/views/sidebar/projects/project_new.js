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

  initialize: function() {
    this._active = false;
  },

  toggleInputables: function(e) {
    e.preventDefault();
    this.$('button.reveal-form').toggleClass('hidden');
    this.$('div.new-project-reveal').toggleClass('activated');
    this.$('form.new-project').toggleClass('hidden');
    this._active = this._active ? false : true
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

    this.$('form.new-project').trigger('refreshProjNewView');
    //PH NEED TO REFRESH THIS VIEW SO IT'LL HAVE A NEW MODELLL -- CAN SAVE MORE THAN ONCE at a time then.
    //PH - check out that CUSTOM TRIGGER ON PAGE ELEMENT
  },
})
