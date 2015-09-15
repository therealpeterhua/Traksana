class Team < ActiveRecord::Base
  has_many :user_teams
  has_many :members, through: :user_teams, source: :user
  belongs_to :leader, class_name: 'User'

  validates :leader_id, :moniker, presence: true
end