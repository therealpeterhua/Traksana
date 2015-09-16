class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :creator, class_name: 'User'
  has_many :user_tasks

  validates :creator_id, :project_id, :title, presence: true
end
