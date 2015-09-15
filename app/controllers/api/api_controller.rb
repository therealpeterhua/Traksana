module Api
  class ApiController < ApplicationController
    before_action :require_logged_in
  end
end

#PH - everything under Api must be housed inside api/ folder and be included in Api modul. Rails looks for these.
