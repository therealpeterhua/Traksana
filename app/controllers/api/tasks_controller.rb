require 'byebug'

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

  def toggle_completion
    # PH - only need this because don't have access to current_user in javascript
    @task = Task.find(params[:id])

    if @task.completer_id
      @task.update!(completer_id: nil)
    else
      @task.update!(completer_id: current_user.id)
    end

    render json: @task
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
