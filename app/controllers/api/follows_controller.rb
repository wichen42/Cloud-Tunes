class Api::FollowsController < ApplicationController

    def index
        @follows = Follow.all
        render :index
    end

    def create
        follower = User.find_by(id: params[:follower_id])
        followed = User.find_by(id: params[:followed_id])
        follower.follow(followed);
    end

    def destroy

    end

    private

    def controller_params
        params.require(:follows).permit(:follower_id, :followed_id)
    end
end