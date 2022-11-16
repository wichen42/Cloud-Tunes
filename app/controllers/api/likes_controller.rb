class Api::LikesController < ApplicationController
    
    def index
        @likes = Like.all();
        if @likes
            render :index
        else
            render json: @likes.errors.full_messages, status: 401
        end
    end

    def create
        like = current_user.likes.new()
        like.track_id = params[:track_id]
        if like.save
            track = Track.find(like.track_id)
            render json: {trackId: track}
        else
            render json: like.errors.full_messages, status: 401

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