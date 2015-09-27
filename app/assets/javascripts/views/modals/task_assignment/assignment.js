Trak.Views.Assignment = Backbone.CompositeView.extend({
  template: JST['modals/task_assignment/assignment'],
  className: 'task-assignment',

  events: {
    'click li.new-assigned-user-item': 'addAssignedUser',
    'click li strong.delete-user-assignment': 'removeAssignedUser'
  },

  initialize: function() {
    //pass in a task model
    //PH** can also listen to task changes here if wanna be able to edit
    this.collection = this.model.assignedUsers();
    this.listenTo(this.collection, 'sync add remove', this.render);
    this.assignedUserIds = this.collection.pluck('id');
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.populateCurrentAssignments();
    this.populateNewAssignments();

    return this;
  },

  populateCurrentAssignments: function() {
    this.collection.each( function(assignedUser) {
      var assignedUserItem = new Trak.Views.AssignedUserItem({
        model: assignedUser
      });
      this.addSubview('ul.current-assigned-user-items', assignedUserItem);
    }.bind(this) );
  },

  populateNewAssignments: function() {
    var possibleAssignedUsers = this.filterAssignees();
    var newAssignment = new Trak.Views.AssignmentNew({
      collection: possibleAssignedUsers
    });
    this.addSubview('div.new-assigned-users', newAssignment);
  },

  filterAssignees: function() {
    var possibleAssignees = Trak.currentTeam.members().filter(
      function(member) {
        return this.assignedUserIds.indexOf(member.id) === -1
      }.bind(this)
    );
    return new Trak.Collections.Users(possibleAssignees);
  },

  addAssignedUser: function(e) {
    var userId = $(e.currentTarget).data('user-id');
    this.assignedUserIds.push(userId);
    this.submitAssignees( this.addToAssignments.bind(this, userId) );
  },

  addToAssignments: function(userId) {
    var user = Trak.currentTeam.members().get(userId);
    this.collection.add(user);
  },

  removeAssignedUser: function(e) {
    var userId = $(e.currentTarget).data('user-id');
    var userIdx = this.assignedUserIds.indexOf(userId);
    this.assignedUserIds.splice(userIdx, 1);
    this.submitAssignees( this.removeFromAssignments.bind(this, userId) )
  },

  removeFromAssignments: function(userId) {
    var user = Trak.currentTeam.members().get(userId);
    this.collection.remove(user);
  },

  submitAssignees: function(callback) {
    if (this.assignedUserIds.length === 0) {
      var data = [""];
    } else {
      var data = this.assignedUserIds;
    }

    $.ajax({
      url: '/api/tasks/' + this.model.id + '/edit_assigned_users',
      method: 'post',
      data: {'task': { 'assigned_user_ids': data }},
      dataType: 'json',
      success: callback
    })
  },
})
