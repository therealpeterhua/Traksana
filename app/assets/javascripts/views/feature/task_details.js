Trak.Views.TaskDetails = Backbone.CompositeView.extend({
  template: JST['feature/task_details'],
  className: 'task-details',

  events: {
    'blur textarea': 'commitEdits',
    'submit': 'disableDefaultSubmit',
    'click #feature-task-description': 'hideGuide',
    'input .task-title > textarea': 'resizeTextArea',
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.checkShowGuide();
    this.addUserAssignments();

    return this;
  },

  addUserAssignments: function() {
    var assignmentsView = new Trak.Views.AssignedUsers({ model: this.model });
    this.addSubview('div.task-assignments', assignmentsView);
  },

  commitEdits: function(e) {
    var form = $(e.currentTarget).parent();
    var attributes = form.serializeJSON().task;
    var chgAttr = Object.keys(attributes)[0];
    var currAttrValue = this.model.escape(chgAttr);

    if (chgAttr === 'description' && !attributes[chgAttr]) {
      this.checkShowGuide(true)
    }
    if (this.model.escape(chgAttr) !== attributes[chgAttr]) {
      this.model.set(attributes)
      this.model.save({}, {
        error: function() {
          alert("Sorry, invalid field");
          $(e.currentTarget).val( currAttrValue );
        }.bind(this)
      });;
    }
  },

  hideGuide: function(e) {
    if ( $(e.currentTarget).hasClass('blank-description') ) {
      $(e.currentTarget).text('').removeClass('blank-description');
    }
  },

  resizeTextArea: function(e) {
    e.currentTarget.scrollHeight;
  },

  checkShowGuide: function(forceShow) {
    if ( forceShow || !this.model.escape('description') ) {
      this.$('textarea#feature-task-description')
        .addClass('blank-description')
        .text("Description...");
    }
  },

  disableDefaultSubmit: function(e) {
    e.preventDefault();
  },
})
