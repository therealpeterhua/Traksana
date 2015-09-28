Trak.Views.LandingPage = Backbone.View.extend({
  template: JST['landing_page/landing_page'],

  events: {
    'click a.create-new-user': 'showUserCreationModal',
    'click div.modal': 'toggleModals',
    'click div.modal > div': 'stopPropagation',
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

  swapModal: function(view) {
    this.toggleModals();
    this._currentModal && this._currentModal.remove();
    this._currentModal = view;
    this.$('.modal').html(this._currentModal.render().$el);
  },

  toggleModals: function() {
    this.$('.modal').toggleClass('hidden');
    this.$('.modal-cover').toggleClass('hidden');
  },

  stopPropagation: function(e) {
    console.log('stopping propagation!');
    e.stopPropagation();
  },

})
