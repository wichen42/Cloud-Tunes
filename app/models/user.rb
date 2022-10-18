# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  about           :text
#  image_url       :string
#  location        :string
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :username, length: { in: 3..30 }, format: {without: URI::MailTo::EMAIL_REGEXP, message: 'Username cannot be an email.' }
  validates :password, length: { in: 6..255}, allow_nil: true

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do 
      session_token = SecureRandom.base64
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
