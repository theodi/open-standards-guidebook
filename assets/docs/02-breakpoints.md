---
title: Responsive breakpoints
---

Breakpoint defintions are stored in `design/breakpoints.yml` as [Design Token compliant](https://github.com/salesforce-ux/theo#overview) `YAML` files, and automatically pulled into Sass and JavaScript using [`gulp-theo`](https://github.com/salesforce-ux/gulp-theo).

Within Sass breakpoints are consumed using the `respond-to()` mixin, from `breakpoint-sass` which takes the string name of the breakpoint as a parameter and a block of statements to wrap in a media query.

## Useful things to know

- Breakpoint values are stored as integer pixels, but are automatically converted to ems on output. 
- All breakpoints are defined as mobile-first


## Current available breakpoints

The list below is automatically generated from the breakpoints available to this project.

<table>
<thead>
<th>Name</th>
<th>`min-width`</th>
<th>Reference</th>
</thead>
<tbody>
{% for key, breakpoint in breakpoints %}
    <tr>
        <td>`{{ key }}`</td>
        <td>`{{ breakpoint.value }}px`</td>
        <td>
            <pre>@include respond-to({{ key }}) {
    // Sass statements to wrap
}</pre></td>
    <tr>
{% endfor %}
</tr>
</table>
