---
# The page title
title: Example Content Page
# Use the content layout
layout: content-page

# The lede text for this page
description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in'

# The following default to true, and only need setting explicitly if you want
# to set them as false
# show_nav:
#
# show_toc: false # Show / hide the table of contents
# show_nav: false # Show / hide the section nav in the hero
# show_intro_sentence: false # Show / hide the intro sentence
# intro_sentence: This is a custom intro sentence that will be used in preference to the global one
#   defined in site.data.snippets.intro_sentence

# Optional sidebar download links, download urls should be kept within the same directory
downloads:
  # Top level - can include an optional title and description
  items:
  - title: Where to find the canvas
    description: >-
      Short description nulla eu molestie massa. Pellentesque fermentu lorem ipsum dolor sit amet consectetuer adipicising elit
    # Download items, template will autodetect if this is a downloadable item or external link
    items:
    - title: Open Standards for Data Canvas
      # Example external link
      url: http://example.com
    - title: 'Open Standards for Data Canvas [pdf]'
      # Example download item, asset stored relative to page file
      url: ./open-standards-for-data.pdf
    - title: 'Open Standards for Data Canvas: GTFS Example [pdf]'
      url: ./gtfs-example.pdf
---

### Content Page Details

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
