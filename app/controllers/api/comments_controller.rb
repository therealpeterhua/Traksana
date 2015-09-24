class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.authored_comments.new(comment_params)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!

    render json: @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:author_id, :content, :task_id)
  end
end
