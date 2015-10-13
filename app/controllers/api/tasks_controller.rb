class Api::TasksController < ApplicationController
  def create
    @task = current_user.created_tasks.new(task_params)
    if @task.save
      render json: @task
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

  def show
    @task = Task.includes(comments: :author).find(params[:id])
    sleep 0.075

    if @task
      render :show
    else
      render json: @task.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def toggle_completion
    @task = Task.find(params[:id])

    if @task.completer_id
      @task.update!(completer_id: nil)
    else
      @task.update!(completer_id: current_user.id)
    end

    render json: @task
  end

  def edit_assigned_users
    @task = Task.find(params[:id])

    if params[:task][:assigned_user_ids] == [""]
      @task.assigned_user_ids = []
    else
      @task.assigned_user_ids = params[:task][:assigned_user_ids].map(&:to_i)
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
      :project_id, :title, :description, :completer_id, :assigned_user_ids
    )
  end
end
