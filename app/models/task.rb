class Task < ActiveRecord::Base
  belongs_to :project
  belongs_to :creator, class_name: 'User'
  has_many :comments, dependent: :destroy
  has_many :user_tasks, dependent: :destroy
  has_many :assigned_users, through: :user_tasks, source: :user

  validates :creator_id, :project_id, :title, presence: true
end
