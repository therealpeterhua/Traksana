class Api::UsersController < ApplicationController
  def index
    @users = current_user.coworkers
    render json: @users
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:email)
  end
end