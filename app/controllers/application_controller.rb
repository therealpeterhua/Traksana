class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :logged_in?,
                :current_user,
                :require_logged_in,
                :current_session

  def log_in(user)
    new_session = Session.new(user_id: user.id)
    new_session.save!      # write a method Session.create_new_for_user(user)
    session[:token] = new_session.token
  end

  def current_user
    @current_user ||= current_session.user if current_session.try(:user)
  end

  def current_session
    return nil if session[:token].nil?
    @current_session ||= Session.find_by(token: session[:token])
  end

  def log_out
    current_session.destroy!
    session[:token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    redirect_to bb_new_session_url unless logged_in?
  end

  def bb_new_session_url
    "/hello/#/there"
  end

  def bb_root_url
    "/#/"
  end
end
