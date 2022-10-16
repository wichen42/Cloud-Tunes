class Api::TracksController < ApplicationController
    wrap_parameters include: Track.attribute_names + [:track]

    def index
        @tracks = Track.all
        render :index
    end

    def create
        track = Track.new(track_params)
        if track.save
            render json: {message: "Track created..."}
        else
            render json: track.errors.full_messages, status: 422
        end

    end

    private

    def track_params
        params.require(:track).permit(:title, :username, :genre, :description, :track)
    end
end