class Api::LikesController < ApplicationController
    
    def create
        like = current_user.likes.new()
        like.track_id = params[:track_id]
        if like.save
            track = Track.find(like.track_id)
            render json: {trackId: track}
        end
    end

    def destroy
        like = Like.find_by(user_id: current_user.id, track_id: params[:track_id])

        if like.destroy
            track = Track.find(params[:track_id])
            render json: {trackId: track}
        end
    end
end