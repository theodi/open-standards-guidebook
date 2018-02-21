#  SoundCloud embed tag for Jekyll/Liquid
#
#  Usage: 
#  
#    {% soundcloud_sound 12345 %}
#    {% soundcloud_sound 12345 widgetname %}
#    {% soundcloud_sound 12345 widgetname ffffff %}
#    {% soundcloud_sound 12345 widgetname ffffff small %}
#
#    ... where 12345 is the SoundCloud sound ID, widgetname is the sound's visual 
#    representation, ffffff is the color, and size is, well, the size (SoundCloud gives you 
#    three options for the "artwork" widget).
#
#  Available SoundCloud widgets:
#   
#    html5 (default)
#    flash *
#    mini *
#    artwork *
#    
#    * Requires a paid SoundCloud tier
#
#  Author: Chris Nunciato (@cnunciato)
#  Source: http://github.com/cnunciato/jekyll-soundcloud

require 'shellwords'

module Jekyll
  class SoundCloudSoundTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      params = Shellwords.shellwords markup
      @sound = { :id => params[0], :widget => params[1] || "html5", :color => params[2] || "ff7700", :size => params[3] || "medium" }
    end

    def render(context)
      case @sound[:widget]

      when "html5"
        "<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" src=\"http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&show_artwork=true\"></iframe>"
      when "flash"
        "<object height=\"81\" width=\"100%\"><param name=\"movie\" value=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;show_comments=false&amp;auto_play=false&amp;color=#{@sound[:color]}\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed allowscriptaccess=\"always\" height=\"81\" src=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;show_comments=false&amp;auto_play=false&amp;color=#{@sound[:color]}\" type=\"application/x-shockwave-flash\" width=\"100%\"></embed></object>"
      when "mini"
        "<object height=\"18\" width=\"100%\"><param name=\"movie\" value=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;auto_play=false&amp;player_type=tiny&amp;font=Arial&amp;color=#{@sound[:color]}\"></param> <param name=\"allowscriptaccess\" value=\"always\"></param> <param name=\"wmode\" value=\"transparent\"></param><embed wmode=\"transparent\" allowscriptaccess=\"always\" height=\"18\" src=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;auto_play=false&amp;player_type=tiny&amp;font=Arial&amp;color=#{@sound[:color]}\" type=\"application/x-shockwave-flash\" width=\"100%\"></embed></object>"
      when "artwork"
        "<object height=\"#{dimension}\" width=\"#{dimension}\"><param name=\"movie\" value=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;auto_play=false&amp;player_type=artwork&amp;color=#{@sound[:color]}\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed allowscriptaccess=\"always\" height=\"220\" src=\"https://player.soundcloud.com/player.swf?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F#{@sound[:id]}&amp;auto_play=false&amp;player_type=artwork&amp;color=#{@sound[:color]}\" type=\"application/x-shockwave-flash\" width=\"220\"></embed></object>"
      else
        ""
      end
    end

    private

      def dimension(size)
        case @sound[:size]

        when 'small'
          220
        when 'medium'
          300
        when 'large'
          425
        else
          0
        end
      end

  end

end

Liquid::Template.register_tag('soundcloud_sound', Jekyll::SoundCloudSoundTag)