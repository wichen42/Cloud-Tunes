class Api::TracksController < ApplicationController

    def index
        @tracks = Track.all
        render :index
    end

    def create
        track = Track.new(post_params)
        if track.save
            render json: {message: "Track created..."}
        else
            render json: track.errors.full_messages, status: 422
        end

    end

    private

    def track_params
        params.rerquire(:track).permit(:title, :username, :genre, :description)
    end
end