# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :title, presence: true

    has_one_attached :photo

    def ensure_photo
        unless self.photo.attached?
            errors.add(:photo, "must be attached");
        end
    end
end
