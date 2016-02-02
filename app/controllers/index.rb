get '/' do
  @title = "this is the title"
  @urls = Url.all
  puts "[LOG] Getting /"
  puts "[LOG] Params: #{params.inspect}"
  erb :"static/index"
end

post '/urls' do
  # byebug
  puts "[LOG] Params: #{params.inspect}"
  Url.create(long_url: params[:long_url])
  redirect '/'
end

#i.e. /q6bda
get '/:short_url' do
  url = Url.find_by(short_url: params[:short_url])
  redirect "http://#{url.long_url}"
  # erb :"static/short_url"
end
