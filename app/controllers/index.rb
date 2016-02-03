get '/' do
  @title = "Shorten a URL here"
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
    @errors = @url.errors.messages[:long_url].to_s
    byebug
    # @errors = @errors.to_s
    redirect "/?errors=#{@errors}"
    # @urls = Url.all
    # erb :'static/index'
  end
  # redirect '/'
end

#i.e. /q6bda
get '/:short_url' do
  @url = Url.find_by(short_url: params[:short_url])
  @url.update_click_count
  redirect '/'
  # redirect "http://#{url.long_url}"
  # erb :"static/short_url"
end
