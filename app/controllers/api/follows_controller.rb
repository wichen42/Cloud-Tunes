class Api::FollowsController < ApplicationController
    wrap_parameters include: Follow.attribute_names + ["followerId", "followedId"]

    def index
        @follows = Follow.all
        if @follows 
            render :index
        end
    end

    def create
        @follow = Follow.new(controller_params)
        if @follow.save
            render :show
        end
        # follower = current_user
        # followed = User.find_by(id: params[:followed_id])
        # follower.follow(followed);
    end

    def destroy
        followed = User.find_by(id: params[:id])
        current_user.unfollow(followed)
        render json: {message: "Deleted"}
    end

    private

    def controller_params
        params.require(:follow).permit(:follower_id, :followed_id)
    end
end