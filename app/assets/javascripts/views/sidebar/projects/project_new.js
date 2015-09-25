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

  toggleInputables: function(e) {
    e.preventDefault();
    this.$('div.new-project-reveal').toggleClass('activated');
    // this.$('form.new-project').toggleClass('hidden');
    var $form = this.$('form.new-project')

    if ( $form.hasClass('zero-width') ) {
      $form.removeClass('zero-width')
      $form.find('input').focus();
    } else {
      $form.addClass('zero-width')
    }

    // if ( this.$('form.new-project').hasClass('hidden') ) {
    //   $('body').on('click', ":not('.new-project')", this.handleClickOut.bind(this));      //PH*** SHOULD BE ONE, NOT ON...
    // }
  },

  handleClickOut: function(e) {
    // console.log("handling click out!");
    // // this.toggleInputables();
    // $('body').off();      //PH**** off("click")
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
