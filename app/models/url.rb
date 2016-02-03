class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
  validates :long_url, uniqueness: true, presence: true
  validates_format_of :long_url, with: /(http:\/\/|https:\/\/)?(www.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/ix , message: "Error: can't shorten, your URL has incorrect format"

  validates :short_url, uniqueness: true
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
