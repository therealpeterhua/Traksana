class Session < ActiveRecord::Base
  belongs_to :user
  validates :user_id, :token, presence: true

  after_initialize :ensure_session_token

  def self.generate_unique_token
    begin
      token = SecureRandom.urlsafe_base64(16)
    end unless Session.exists?(token: token)

    token
  end

  private

  def ensure_session_token
    self.token ||= Session.generate_unique_token
  end

end
