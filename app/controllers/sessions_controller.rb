class SessionsController < ApplicationController
  def new
    render :new
  end

  def omniauth
    user = User.find_or_create_by_auth_hash(omniauth_hash)

    log_in(user)
    redirect_to bb_root_url
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      log_in(user)
      redirect_to bb_root_url
    else
      render json: "Couldn't find that username and password!",
             status: :unprocessable_entity
    end
  end

  def sign_in_guest
    user = User.pick_guest
    log_in(user)
    redirect_to bb_root_url
  end

  def check_credentials
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      render json: :PASS
    else
      render json: :FALSE
    end
  end

  def destroy
    log_out
    redirect_to bb_new_session_url
  end

  private

  def omniauth_hash
    request.env['omniauth.auth']
  end
end
