# Query model for queries from users
class Query < ActiveRecord::Base
  before_save :increment_counter, :downcase_text

  scope :most_frequent, -> { order(count: :desc) }
  scope :suggest_most_frequent, ->(text) { where('text like ?', "%#{text}%").most_frequent }

  private
    # Increments the query's counter on every save
    def increment_counter
      unless self.count.nil?
        self.count += 1
      else
        self.count = 1
      end
    end

    # Make queries text downcase for better analysis
    def downcase_text
      self.text.downcase!
    end
end
