class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  helper_method :logged_in?,
                :current_user,
                :require_logged_in,
                :current_session

  def log_in(user)
    new_session = Session.new(user_id: user.id)
    new_session.save!
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
    current_session.try(:destroy!)
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
