Trak.Views.Assignment = Backbone.CompositeView.extend({
  template: JST['modals/task_assignment/assignment'],
  className: 'modal task-assignment',

  events: {
    'click button.commit-changes': 'submitNewAssignees'
  },

  initialize: function() {
    //remember: model is task itself, collection is task.users();
    //PH** can also listen to task changes here if wanna be able to edit
    this.listenTo(this.model.assignedUsers(), 'sync', this.render);
    this.currentAssignedUsers = this.model.assignedUsers().pluck('id');
  },

  render: function() {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.populateAssignmentItems();

    return this;
  },

  populateAssignmentItems: function() {
    this.model.assignedUsers().each( function(assignedUser) {
      var assignedUserItem = new Trak.Views.AssignedUserItem({
        model: assignedUser
      });

      this.addSubview('ul.current-assigned-user-items', assignedUserItem);
    }.bind(this) );

    var newAssignment = new Trak.Views.AssignmentNew
  },

  submitNewAssignees: function() {
    var assignedUserIds = [];

    // #find returns NOT AN ARRAY -- can't loop thru with each
    // #find returns a collection (not in BB sense) of DOM objects
    // #find, wrapping results in $ doesn't modify contents into jquery objects
    var assignedUserItems = this.$el.find('.assigned-user');

    for (var i = 0; i < assignedUserItems.length; i++) {
      var userId = $(assignedUserItems[i]).data('assigned-user-id');
      assignedUserIds.push(userId);
    }

    $.ajax({
      url: '/api/tasks/' + this.model.id + '/edit_assigned_users',
      method: 'post',
      data: {'task': { 'assigned_user_ids': assignedUserIds } },
      dataType: 'json',
      success: function() {
        alert('success!')
      }
    })
  }
})
