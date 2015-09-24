class Comment < ActiveRecord::Base
  belongs_to :author, class_name: 'User'
  belongs_to :task

  validates :author_id, :task_id, :content, presence: true
end
