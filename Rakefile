require 'html-proofer'

##
# HTML proofer
#
# options here: https://github.com/gjtorikian/html-proofer
##
task :check_html do
  options = {
    # Work with pretty URLs
    :assume_extension => true,
    :internal_domains => ['https://standards.theodi.org'],
    :http_status_ignore => [406],
    # Allow TOC links
    :allow_hash_href => true,
    # Cache 200 external links (errors are always rechecked)
    :cache => { :timeframe => '2w' }
  }
  HTMLProofer.check_directory("./dist", options).run
end
