---
title: Spacing helpers
---

Spacing defintions are stored in `design/spacing.yml` as [Design Token compliant](https://github.com/salesforce-ux/theo#overview) `YAML` files, and automatically pulled into Sass and JavaScript using [`gulp-theo`](https://github.com/salesforce-ux/gulp-theo).

Within Sass spacing values are consumed using the `spacing()` helper function. This function takes a space delimited list of values, consisting of either the name of a spacing unit (see below) and/or integer values.

## Useful things to know

- All values are automatically converted to rems on output
- If you wish to use an integer value, specify in unitless pixels 


## Spacing units and names

The list below is automatically generated from the breakpoints available to this project.

<table>
<thead>
<th>Name</th>
<th>Value</th>
<th>Reference</th>
</thead>
<tbody>
{% for key, breakpoint in spacing %}
    <tr>
        <td>`{{ key }}`</td>
        <td>`{{ breakpoint.value }}px`</td>
        <td>`property: spacing({{ key }})`</td>
    <tr>
{% endfor %}
</tr>
</table>
