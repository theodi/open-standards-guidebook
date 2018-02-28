---
title: Modular Scale
---

Font sizing is based on a modular scale, and utilises the [modularscale-sass](https://github.com/modularscale/modularscale-sass) plugin to split 2 threads, mobile and desktop. Mobile uses a [17px / 1.200 ratio](http://www.modularscale.com/?17&px&1.200), desktop uses a [15px / 1.333 ratio](http://www.modularscale.com/?15&px&1.333).  

`tools/_font-ratio.scss` is where these parameteres are defined and can be tweaked. Docs on the available options can be found [here](https://github.com/modularscale/modularscale-sass).

Within Sass modular scale output is declared using the `ms()` helper function. This function takes a number to define whereabouts you want to be on the scale tier, and an optional `$thread` definition, this is commonly used to change threads across breakpoints, for example:

```
h2 {
  font-size: ms(2);

  @include respond-to(medium) {
    font-size: ms(2, $thread: desktop);
  }
}
```

This would give you a 2 tier up, 17px base, 1.200 ratio font on small screens, and a 15px base, 1.333 ratio font on medium +

## Useful things to know

- Scale can be changed globally by simply changing the values in `tools/_font-ratio.scss`
- Multiple threads can be added or removed 


## Modular Scale defaults

The list below is the current default for this project.

<table>
<thead>
<th>Name</th>
<th>Base</th>
<th>Ratio</th>
</thead>
<tbody>
    <tr>
        <td>`default`</td>
        <td>`17px`</td>
        <td>`1.200`</td>
    <tr>
    <tr>
        <td>`desktop`</td>
        <td>`15px`</td>
        <td>`1.333`</td>
    <tr>
</tr>
</table>
