class Api::ProjectsController < ApplicationController
  def create
    @project = current_user.projects.new(project_params)
    #**PH - make sure to pass up team_id here, should be in current_team
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy()
    render json: @project
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors.full_messages,
             status: :unprocessable_entity
  end

  private

  def project_params
    params.require(:project).permit(
      :owner_id, :team_id, :completer_id, :code_name
    )
  end
end
