# API for queries from users to analyze most searchable queries
class QueryController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Returns a list of suggestions based on most frequent queries in real time
  def suggestions
    render json: Query.suggest_most_frequent(params[:query]).limit(5)
  end

  # Save a search query incrementing the counter if exists
  def search
    query = Query.where(text: params[:query].downcase).first_or_initialize
    if query.save
      return render json: query
    end
  end

  # Returns all queries order by most frequent
  def all_searches
    render json: Query.all.most_frequent
  end

  # Destroy all queries. Used only for reset button.
  def reset_queries
    render json: Query.destroy_all
  end
end
