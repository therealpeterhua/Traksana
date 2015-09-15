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
      redirect_to root_url
    else
      render json: "Couldn't find that username and password!",
             status: :unprocessable_entity
    end
  end

  def destroy
    log_out
    redirect_to new_session_url
  end
end
