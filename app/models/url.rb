class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
  validates :long_url, uniqueness: true
  validates :short_url, uniqueness: true
  before_create :shorten

  def shorten
    short_url = SecureRandom.urlsafe_base64(7)
    self.short_url = short_url
  end

end
