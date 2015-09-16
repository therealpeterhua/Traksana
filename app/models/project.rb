belongs_to: :team
belongs_to: :owner, class_name: 'User'

validates :team_id, :owner_id, :code_name, presence: true
