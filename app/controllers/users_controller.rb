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

  def show
    render json: "Yet to be implemented!"
    # PH** - should send down all associated projects, tasks, comments, etc. with this user -- so can show them the tabulated view of all their To-Dos
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  #PH - need to have email, invite takes place via email.
  #Name should be optional..
end
