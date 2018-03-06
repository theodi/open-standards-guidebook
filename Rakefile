require 'html-proofer'

task :check_html do
  options = {
    :assume_extension => true,
    # :url_swap => {
    #     '^/open-standards-guidebook/(.*)' => '/$1',
    # },
    :internal_domains => ['https://theodi.github.io'],
    :http_status_ignore => [406]
  }
  HTMLProofer.check_directory("./dist", options).run
end
