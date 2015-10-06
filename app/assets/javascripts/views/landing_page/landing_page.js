Trak.Views.LandingPage = Backbone.View.extend({
  template: JST['landing_page/landing_page'],
  className: 'sign-in-super-container',

  events: {
    'click button.create-new-user': 'showUserCreationModal',
  },

  initialize: function() {
    Trak.Utils.extendModals(this);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  showUserCreationModal: function(e) {
    e.preventDefault();
    var userCreationModal = new Trak.Views.UserCreation();
    this.swapModal(userCreationModal);
    $.rails.refreshCSRFTokens();
  },

})
