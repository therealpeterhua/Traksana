module Api
  class TeamsController < ApiController
    def index
      @teams = current_user.teams
      render json: @teams
    end

    def create
      begin
        ActiveRecord::Base.transaction do
          @team = current_user.managed_teams.create!(team_params)
          @team.members << current_user
        end
        render json: @team
      rescue ActiveRecord::RecordInvalid
        render json: @team.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def show
      @team = Team.includes(
        projects: {tasks: :assigned_users}).find(params[:id])

      if @team
        render 'show'
      else
        render json: @team.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def assign_members
      @team = Team.find(params[:id])

      if params[:team][:member_ids] == [""]
        @team.member_ids = []
      else
        @team.member_ids = params[:team][:member_ids].map(&:to_i)
      end

      render json: @team
    end

    private

    def team_params
      params.require(:team).permit(:leader_id, :moniker, :team_member_ids)
    end
  end
end
