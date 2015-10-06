class UsersController < ApplicationController
  wrap_parameters false

  def new
    render 'new'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to bb_root_url
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: "Not yet implemented..."
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :avatar)
  end

  #PH - need to have email, invite takes place via email.
  #Name should be optional..
end
