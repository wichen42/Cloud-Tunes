class Api::FollowsController < ApplicationController

    def index
        @follows = Follow.all
        render :index
    end

    def create
        follower = current_user
        followed = User.find_by(id: params[:followed_id])
        follower.follow(followed);
    end

    def destroy
        followed = User.find_by(id: params[:id])
        current_user.unfollow(followed)
    end

    private

    def controller_params
        params.require(:follows).permit(:follower_id, :followed_id, :id)
    end
end