class Api::TasksController < ApplicationController
  def create
    @task = current_user.created_tasks.new(task_params)
    if @task.save
      render json: @task
      #PH QUESTION: renders json here for Backbone to set attr on the model?
    else
      render json: @task.errors.full_messages,
             status: :unprocessable_entity
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy!
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(
      :project_id, :title, :description, :completer_id,
    )
  end
end
