# == Schema Information
#
# Table name: tracks
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  username    :string           not null
#  genre       :string           not null
#  description :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Track < ApplicationRecord
    validates :title, :username, :genre, :description, presence: true

    has_one :audio

    # validates_attachment_content_type :audio, :content_type => ['audio/mp3']

    belongs_to :user
end
