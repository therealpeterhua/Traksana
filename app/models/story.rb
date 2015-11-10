class Story < ActiveRecord::Base
  belongs_to :user
  belongs_to :task

  validates :user_id, :task_id, :content, presence: true
end
