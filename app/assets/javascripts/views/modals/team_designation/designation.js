Trak.Views.Designation = Backbone.CompositeView.extend({
  template: JST['modals/team_designation/designation'],
  className: 'team-designation',

  initialize: function() {
    this.model = Trak.currentTeam;
    this.listenTo(this.model, "sync change", this.render);
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);
    this.populateCurrentMembers();
    this.populateNewMemberSearch();

    return this;
  },

  populateCurrentMembers: function() {
    var designationCurrentView = new Trak.Views.DesignationCurrent({
      collection: this.model.members()
    });
    this.addSubview('div.current-members', designationCurrentView);
  },

  populateNewMemberSearch: function() {
    var designationNewView = new Trak.Views.DesignationNew();
    this.addSubview('div.new-members', designationNewView);
  },

})
