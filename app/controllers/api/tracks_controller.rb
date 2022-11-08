class Api::TracksController < ApplicationController
    wrap_parameters include: Track.attribute_names + [:track] + [:image]

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

    def destroy
        track = Track.find(params[:id])
        if track
            track.destroy
        else
            render json: { errors: track.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def track_params
        params.require(:track).permit(:title, :username, :genre, :description, :track, :user_id, :image)
    end
end