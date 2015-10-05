Trak.Views.DesignationCurrent = Backbone.View.extend({
  template: JST['modals/team_designation/designation_current'],
  className: 'current-members-container',

  events: {
    'click .delete-designation': 'deleteDesignation',
  },

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.memberIds = this.collection.pluck('id');
    this.currentTeamId = Trak.currentTeam.id;
  },

  render: function() {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
  },

  deleteDesignation: function(e) {
    var userId = $(e.currentTarget).data('user-id');
    var user = this.collection.get(userId);

    var url = '/api/teams/' + this.currentTeamId + '/assign_members';
    this.memberIds.splice( this.memberIds.indexOf(userId), 1 );

    if (this.memberIds.length === 0) {
      this.memberIds = [""];
    }

    var data = { team: {member_ids: this.memberIds} };

    $.ajax({
      url: url,
      method: 'post',
      data: data,
      dataType: 'json',
      success: function(response) {
        this.collection.remove(user);
      }.bind(this)
    });
  },

})
