# == Schema Information
#
# Table name: follows
#
#  id          :bigint           not null, primary key
#  follower_id :integer          not null
#  followed_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Follow < ApplicationRecord
    validates :follower_id, :followed_id, presence: true

    belongs_to :follower,
    class_name: "User"

    belongs_to :followed,
    class_name: "User"
end
