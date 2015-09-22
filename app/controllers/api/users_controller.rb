class Api::UsersController < ApplicationController
  wrap_parameters false

  def index
    @users = current_user.coworkers
    render json: @users
  end

  def show
    @user = User.find(params[:id])
  end

  def current_user_info
    render :current_user_info
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :avatar)
  end
end
