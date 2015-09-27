class User < ActiveRecord::Base
  has_many :user_teams
  has_many :teams, through: :user_teams, source: :team
  has_many :managed_teams, class_name: 'Team', foreign_key: :leader_id
  has_many :subordinates, -> {distinct},
            through: :managed_teams,
            source: :members
  has_many :coworkers, -> {distinct},
            through: :teams,
            source: :members

  has_many :owned_projects, class_name: 'Project', foreign_key: :owner_id
  has_many :projects,
            through: :teams,
            source: :projects

  has_many :user_tasks
  has_many :created_tasks, class_name: 'Task', foreign_key: :creator_id
  has_many :assigned_tasks,
            through: :user_tasks,
            source: :task

  has_many :authored_comments,
            class_name: 'Comment',
            foreign_key: :author_id

  validates :name, :password_hash, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validate :has_email_or_uid
  validate :has_unique_email

  has_attached_file :avatar, default_url: "user.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  def self.generate_unique_key
    # PH**generate unique session tokens here
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user.try(:is_password?, password)
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider]
    )

    unless user
      user = User.create!(
        uid: auth_hash[:uid],
        provider: auth_hash[:provider],
        name: auth_hash[:info][:name],
        # avatar_url: auth_hash[:info][:image],
        password: SecureRandom.urlsafe_base64(16),
        avatar: URI.parse(auth_hash[:info][:image])
      )
    end

    user
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

  def has_email_or_uid
    if email.blank? && uid.blank?
      errors[:base] << "Please provide an email, or sign in with Facebook."
    end
  end

  def has_unique_email
    return if email.blank? || self.id

    if User.where("email != ''").exists?(email: email)
      errors[:base] << "That email has already been taken."
    end
  end
end
