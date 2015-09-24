Trak.Views.DesignationNewList = Backbone.View.extend({
  template: JST['modals/team_designation/designation_new_list'],
  className: 'search-result-items',
  tagName: 'ul',

  events: {
    'click li': 'addToTeam',
  },

  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render);
    this.memberIds = Trak.currentTeam.members().pluck('id');
    this.currentTeamId = Trak.currentTeam.id;
  },

  render: function() {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
  },

  addToTeam: function(e) {
    var userId = $(e.currentTarget).data('user-id');
    var user = this.collection.get(userId);
    var url = '/api/teams/' + this.currentTeamId + '/assign_members';
    this.memberIds.push(userId);

    var data = { team: {member_ids: this.memberIds} };

    $.ajax({
      url: url,
      method: 'post',
      data: data,
      dataType: 'json',
      success: function(response) {
        Trak.currentTeam.members().add(user);
        this.removeFromCollection(user);
      }.bind(this)
    });
  },

  removeFromCollection: function(user) {
    this.collection.remove(user);     //triggers re-render
  },

  //PH** - if you add from the collection, re-render HERE, rather than at the top-level -- you want the search thing to stay in there. Of course you'll have to parse it somewhere TOO.
  //If you don't change the input, the other event won't fire.
})
