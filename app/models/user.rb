class User < ActiveRecord::Base
  has_many :user_teams
  has_many :teams, through: :user_teams, source: :team
  has_many :managed_teams, class_name: 'Team', foreign_key: :leader_id
  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id

  has_many :subordinates, -> {distinct},
            through: :managed_teams,
            source: :members

  has_many :coworkers, -> {distinct},
            through: :teams,
            source: :members

  has_many :projects,
            through: :teams,
            source: :projects

  # has_many :assigned_projects   PH** this is next

  validates :email, :password_hash, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  def self.generate_unique_key
    # PH**generate unique session tokens here
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user.try(:is_password?, password)
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_hash).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!

    return session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
