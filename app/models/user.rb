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
#  location        :string
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :username, length: { in: 3..30 }, format: {without: URI::MailTo::EMAIL_REGEXP, message: 'Username cannot be an email.' }
  validates :password, length: { in: 6..255}, allow_nil: true

  has_one_attached :image
  has_one_attached :banner

  has_many :tracks

  has_many :active_follows, 
  class_name: "Follow", 
  foreign_key: "follower_id", 
  dependent: :destroy

  has_many :passive_follows,
  class_name: "Follow",
  foreign_key: "followed_id",
  dependent: :destroy

  has_many :following, through: :active_follows, source: :followed
  has_many :followers, through: :passive_follows, source: :follower

  def ensure_photo
    unless self.photo.attached?
        errors.add(:photo, "must be attached");
    end
  end

  # User Auth Methods

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  # Follow Methods

  def follow(user)
    active_follows.create(followed_id: user.id)
  end

  def unfollow(user)
    active_follows.find_by(followed_id: user.id).destroy
  end

  def following?(user)
    following.include?(user)
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
