Trak.Views.TeamForm = Backbone.View.extend({
  template: JST['landing_page/team_form'],
  addClass: "new-team",

  events: {
    "click button.submit-form": "submitForm",
    //PH may change to "submit form: " because won't have button in end
    "click button.reveal-form": "revealForm"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  revealForm: function(e) {
    e.preventDefault();
    this.toggleInputable();
  },

  submitForm: function(e) {
    e.preventDefault();
    var attributes = this.$("form").serializeJSON().team
    this.model.set(attributes);
    //PH check if this is all OK
    this.model.save({}, {
      success: function(model) {
        this.collection.add(model, {merge: true});
        //PH QUESTION why need merge: true again?
        this.toggleInputable();
      }.bind(this),
      error: function() {
        debugger;
      }
    });
  },

  toggleInputable: function() {
    this.$("form.new-team").toggleClass("hidden");
    this.$("button.reveal-form").toggleClass("hidden");
  }
})
