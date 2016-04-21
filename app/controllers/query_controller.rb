#
# API for queries from users to analyze most searchable queries
#
# @author Marco Ávila <marcotulio.avila@gmail.com>
class QueryController < ApplicationController
  skip_before_action :verify_authenticity_token

  #
  # Returns a list of suggestions based on most frequent queries in real time
  #
  # @author Marco Ávila <marcotulio.avila@gmail.com>
  def suggestions
    render json: Query.suggest_most_frequent(params[:query]).limit(5)
  end

  #
  # Save a search query incrementing the counter if exists
  #
  # @author Marco Ávila <marcotulio.avila@gmail.com>
  def search
    query = Query.where(text: params[:query].downcase).first_or_initialize
    if query.save
      return render json: query
    end
  end

  #
  # Returns all queries order by most frequent
  #
  # @author Marco Ávila <marcotulio.avila@gmail.com>
  def all_searches
    render json: Query.all.most_frequent
  end

  #
  # Destroy all queries. Used only for reset button.
  #
  # @author Marco Ávila <marcotulio.avila@gmail.com>
  def reset_queries
    render json: Query.destroy_all
  end
end