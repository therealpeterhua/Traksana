Trak.Views.TeamForm = Backbone.View.extend({
  template: JST['teams_page/team_form'],
  className: "new-team-modal",

  events: {
    "click button.submit-form": "submitNewTeam",
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

  submitNewTeam: function(e) {
    e.preventDefault();
    var attributes = this.$("form").serializeJSON().team
    this.model.set(attributes);
    this.model.save({}, {
      success: function(model) {
        this.collection.add(model);
        Trak.currentUser.teams().add(model);
        this.toggleInputable();
      }.bind(this),
      error: function() {
      }
    });
  },

  toggleInputable: function() {
    this.$("form.new-team").toggleClass("hidden");
    this.$("button.reveal-form").toggleClass("hidden");
  },
})
