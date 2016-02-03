
get '/' do
  # @title = "SHORTEN. SHARE. MEASURE."
  @urls = Url.all
  puts "[LOG] Getting /"
  puts "[LOG] Params: #{params.inspect}"
  erb :"static/index"
end

post '/urls' do
  # byebug
  puts "[LOG] Getting /urls"
  puts "[LOG] Params: #{params.inspect}"
  @url = Url.new(long_url: params[:long_url])
  if @url.save
    redirect '/'
  else
    @errors = @url.errors.messages[:long_url].first
    # byebug
    redirect "/?errors=#{@errors}"
  end
end

#i.e. /q6bda
get '/:short_url' do
  @url = Url.find_by(short_url: params[:short_url])
  if @url.present?
    @url.update_click_count
    redirect "#{@url.long_url}"
  else
    redirect "#{@url.long_url}" #
  end
end
