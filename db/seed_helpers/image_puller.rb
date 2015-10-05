mechanize = Mechanize.new

page = mechanize.get(
  'https://www.google.com/search?as_st=y&tbm=isch&hl=en&as_q=female+headshots&as_epq=&as_oq=&as_eq=&cr=&as_sitesearch=&safe=images&tbs=isz:m,iar:s'
)

images = page.search('img')

images.each_with_index {|image, i| mechanize.get(image.attributes["src"]).save "female_headshots/#{i}.jpg"}
