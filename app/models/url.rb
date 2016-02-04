class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
  validates_presence_of :long_url, message: "Error: URL can't be blank, please try again."
  validates_uniqueness_of :long_url, message: "Error: URL has already been shortened, please try again."
  validates_format_of :long_url, with: /(http:\/\/|https:\/\/)?(www.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/ix , message: "Error: incorrect URL format, remember to include http:// or https://"

  validates_uniqueness_of :short_url
  before_create :shorten

  def shorten
    short_url = SecureRandom.urlsafe_base64(7)
    self.short_url = short_url
  end

  def update_click_count
    self.click_count += 1
    self.save
  end
end
