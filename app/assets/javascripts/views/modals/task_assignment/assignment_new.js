Trak.Views.AssignmentNew = Backbone.CompositeView.extend({
  template: JST['modals/task_assignment/assignment_new'],

  events: {
    'input input.new-assignments-selector': 'refreshSubview'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.populateNewAssignmentItems();

    return this;
  },

  refreshSubview: function() {
    this.removeSubview(
      '.new-assignments-container', this._newAssignmentList
    );
    this.populateNewAssignmentItems();
  },

  populateNewAssignmentItems: function() {
    this._newAssignmentList = new Trak.Views.AssignmentNewList({
      collection: this.prefilteredUsers()
    });

    this.addSubview('.new-assignments-container', this._newAssignmentList);
  },

  prefilteredUsers: function(e) {
    var filterClause = this.$('input.new-assignments-selector').val();
    var regEx = new RegExp(filterClause, "i");

    var filteredCollection = this.collection.filter(
      function(user) {
        return regEx.test(user.escape('name')) ||
               regEx.test(user.escape('email'));
      }
    );

    return new Trak.Collections.Users(filteredCollection);
  },

})
