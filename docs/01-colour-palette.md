---
title: Colour palette
---

Colour definitions are stored in `design/colours.yml` as [Design Token compliant](https://github.com/salesforce-ux/theo#overview) `YAML` files, and automatically pulled into Sass and JavaScript using [`gulp-theo`](https://github.com/salesforce-ux/gulp-theo).

Within Sass colours are consumed using the `palette()` helper function, which takes the string name of the colour and returns an `rgb()` value.

## Current available colours

The list below is automatically generated from the colours available to this project.

<table>
<thead>
<th>Hex</th>
<th>Comment</th>
<th>Reference</th>
</thead>
<tbody>
{% for key, colour in palette %}
    <tr>
        <td style="background-color:{{ colour.value }}">
            `{{ colour.value }}`
        </td>
        <td>{{ colour.comment }}</td>
        <td`palette({{ key }})`</td>
    <tr>
{% endfor %}
</tr>
</table>
