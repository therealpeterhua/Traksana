class Story < ActiveRecord::Base
  belongs_to :user
  belongs_to :task

  validates :user_id, :task_id, :content, presence: true

  def self.record_task_update(task)
    story = task.stories.new(content: "#{current_user.name} updated the task details.", task_id: task.id, user_id: current_user.id)
    story.save!
  end

  def self.record_task_completion(task)
    # case completion!
    completion = task.completer_id.nil? ? "incomplete" : "complete"

    story = task.stories.new(content: "#{current_user.name} marked the task as #{completion}.", task_id: task.id, user_id: current_user.id)
    story.save!
  end
end
