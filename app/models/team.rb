class Team < ActiveRecord::Base
  has_many :user_teams, dependent: :destroy
  has_many :members, through: :user_teams, source: :user
  has_many :projects, dependent: :destroy
  belongs_to :leader, class_name: 'User'

  validates :leader_id, :moniker, presence: true
end
