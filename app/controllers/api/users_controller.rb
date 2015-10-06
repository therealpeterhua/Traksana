class Api::UsersController < ApplicationController
  wrap_parameters false

  def show
    @user = User.find(params[:id])
  end

  def current_user_info
    render :current_user_info
  end

  def search
    search_query = params[:search_query].downcase
    @matches = User.where(
      "lower(name) LIKE ? OR lower(email) LIKE ?",
      "%#{search_query}%",
      "%#{search_query}%"
    )

    render :search
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :avatar)
  end

end
