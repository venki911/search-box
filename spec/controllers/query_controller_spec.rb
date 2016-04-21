require 'spec_helper'

describe QueryController do

  describe "GET 'guess'" do
    it "returns http success" do
      get 'guess'
      response.should be_success
    end
  end

  describe "GET 'post'" do
    it "returns http success" do
      get 'post'
      response.should be_success
    end
  end

end
