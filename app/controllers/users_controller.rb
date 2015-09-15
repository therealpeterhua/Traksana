class UsersController < ApplicationController
  def new
    render 'new'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  #PH - need to have email, invite takes place via email.
  #Name should be optional...
end
