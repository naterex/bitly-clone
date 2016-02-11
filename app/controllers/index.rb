
get "/" do
  puts "[LOG] Getting /"
  puts "[LOG] Params: #{params.inspect}"

  @site_name = "nate.ly/"
  @urls = Url.all
  @urls = @urls.sort_by{ |attribute| attribute[:id] }.reverse # show last added URL at top of list
  erb :"static/index"
end

post "/urls" do
  puts "[LOG] Getting /urls"
  puts "[LOG] Params: #{params.inspect}"
  @url = Url.new(long_url: params[:long_url])

  if @url.save
    # parse @url to JSON for AJAX success result
    @url.to_json
  else
    # set HTTP status code to 422 (unprocessable entity) to trigger AJAX error
    status 422
    @errors = @url.errors.messages[:long_url].first
    # parse @errors to JSON for AJAX error result
    @errors.to_json
  end
end

#i.e. /q6bda
get "/:short_url" do
  puts "[LOG] Getting /:short_url"
  puts "[LOG] Params: #{params.inspect}"

  @url = Url.find_by(short_url: params[:short_url]) || Url.find_by(long_url: params[:short_url]) # find by short_url or long_url

  if @url.present? # if url found

    if @url.short_url == params["short_url"] # if short_url found
      @url.update_click_count
    end

    if @url.long_url.scan(/(http:\/\/|https:\/\/)/).any? # if long_url has HTTP/HTTPS
      redirect "#{@url.long_url}"
    else
      redirect "http://#{@url.long_url}" # append HTTP to long_url
    end

  else
    redirect "/"
  end
end

post "/delete/:id" do
  puts "[LOG] Getting /delete/:id"
  puts "[LOG] Params: #{params.inspect}"
  @url = Url.find(params[:id])
  @url.destroy

  if @url.destroyed?
    status 200
  else
    status 404 # 404 Not Found
  end
end

