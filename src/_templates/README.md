# Page templates

The files in this directory provide commented templates that can be used when creating new pages in the site.

The following templates are available:

- Content page
- Listing page
- Podcast page
- Case study page
- Resource list page
- Homepage

The template that the site will render is determined by the `layout` key in each page's front matter - be sure to set the correct `layout` value or the page will not render as expected!

## Shared frontmatter keys

The following keys can be used on all page templates:

```
nav:
    title: 'My custom nav title' # specify a string to use when referencing the page in navigation, e.g. section nav and breadcrumbs - defaults to page.title
```

## Inline callouts

To make a callout box within the Markdown text of a page do the following:



```
## A markdown heading

Standards are used in every sector across the world to capture agreements on physical items, concepts, ideas, digital products, and processes.


<div class="callout" markdown="1">
Everyday standards include:
* standards for electrical sockets that allow any appliance to plug in seamlessly
* standard for addresses that makes post delivery more efficient
* standard units of measurement for drinks that makes bar service faster and easier
* standardised sizes for nuts and bolts that makes buying and selling more cost effective
</div>


## Heading

Back to markdown here
```

Notes: the `markdown="1"` is required to parse markdown inside the `<div>` element


## Checklist headings


To output a completeable / checklist heading, just use the following markup pattern
```
<h3><input class="h-checkbox" type="checkbox" id="heading1" value="heading1" {% if checked == true %}checked{% endif %}><label for="heading1">Checklist Heading</label></h3>

```

Notes:

- The same value must be used for the `id` attribute on the heading and the `for` attribute on the label
- The `id` / `for` attribtute value must be unique per heading in the page
