class Project < ActiveRecord::Base
  belongs_to :team
  belongs_to :owner, class_name: 'User'
  has_many :tasks

  validates :team_id, :owner_id, :code_name, presence: true
end
