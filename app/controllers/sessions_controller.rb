class SessionsController < ApplicationController
  def new
    render 'new'
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      log_in(user)
      render json: user
    else
      render json: "Couldn't find that username and password!"
    end
  end

  def destroy
    log_out
  end
end
