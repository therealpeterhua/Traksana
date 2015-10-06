Trak.Views.LandingPage = Backbone.View.extend({
  template: JST['landing_page/landing_page'],
  className: 'sign-in-super-container',

  events: {
    'click button.create-new-user': 'showUserCreationModal',
    'submit form.user-sign-in': 'checkValidUser',
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

  checkValidUser: function(e) {
    //we'll prevent default here if check isn't passed -- else we'll get the form continue through by not preventing default (all Backbone event triggered functions take place BEFORE the default action)

    //you need to preventDefault here -- if in ajax request, by the time the ajax fires (remember ajax === asynch) it'll already have bubbled up (ie. server will have registered it)
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();

    $.ajax({
      method: 'get',
      url: '/sessions/check_credentials',
      dataType: 'json',
      data: data,
      success: function(response) {
        if (response === 'PASS') {
          debugger;
          e.currentTarget.submit();       //can only call on DOM
        } else {
          this.revealError();
        }
      }.bind(this),
    });
  },

  revealError: function() {
    this.$('div.error-message').removeClass('hidden');
    this.$('input').addClass('error');
  },

})
