---
title: Grid
---

## Initialising the Grid

Adding the `.g` class initiates the flex based grid system, adding the `.g__cell` class applies the base cell spacing that negates the negative margin applied on `.g`, all children within a `.g` should have `.g__cell` applied.

```
<div class="g">
    <div class="g__cell">
        <p>I'm naked!</p>
    </div>
</div>
```

## Columns

There are a number of modifier classes available for `.g__cell`, the first being `auto`

### Auto-flex columns

Applying `.g__cell-auto` will cause flex to automatically share the full space of it's parent `.g`, this can be combined with more traditional column based modifiers. These will have no % columns or any widths assigned at all, they are simply sharing the parent `.g` space.

```
<div class="g">
    <div class="g__cell g__cell-auto">
        <p>Auto shared space</p>
    </div>
    <div class="g__cell g__cell-auto">
        <p>Auto shared space</p>
    </div>
    <div class="g__cell g__cell-auto">
        <p>Auto shared space</p>
    </div>
</div>
```

### Responsive

This (and any other cell modifier) can be used responsively, simply add a breakpoint modifier.

```
<div class="g">
    <div class="g__cell g__cell-12 g__cell-auto--medium g__cell-6--large">
        <p>auto</p>
    </div>
</div>
```

This example would give us a full 12 col cell at mobile, a auto cell at medium, and a half width 6 column cell at large.

###  More traditional columns

This works in a more traditional way by applying a number based cell width. We are using a 12 column grid so anything in that system can be used

```
<div class="g">
    <div class="g__cell g__cell-12">
        <p>12 column cell</p>
    </div>
    <div class="g__cell g__cell-11">
        <p>11 column cell</p>
    </div>
    // etc...
</div>
```

### Combining columns with auto

The 2 methods can be combined, for example, you may want a 3 column cell, followed by space filled up dynamic flex cells, followed by another 3 column cell.

```
<div class="g">
    <div class="g__cell g__cell-4">
        <p>4 col</p>
    </div>
    <div class="g__cell g__cell-auto">
        <p>auto</p>
    </div>
    <div class="g__cell g__cell-auto">
        <p>auto</p>
    </div>
    <div class="g__cell g__cell-4">
        <p>4 col</p>
    </div>
</div>
```

## Cell Selector Reference

<table>
<thead>
<th>Selector</th>
<th>Width</th>
</thead>
<tbody>
    {% for i in [1,2,3,4,5,6,7,8,9,10,11,12] %}
        <tr>
            <td>`.g__cell-{{ i }}`</td>
            <td>{{ i / 12 * 100 }}%</td>
        </tr>
    {% endfor %} 

    {% for key, breakpoint in breakpoints %}
        {% for i in [1,2,3,4,5,6,7,8,9,10,11,12] %}
        <tr>
            <td>`.g__cell-{{ i }}--{{ key }}`</td>
            <td>`{{ i / 12 * 100 }}% ({{ key }})`</td>
        </tr>
        {% endfor %} 
    {% endfor %}
    <tr>
        <td>`.g__cell-auto`</td>
        <td>`auto`</td>
    </tr>
    {% for key, breakpoint in breakpoints %}
        <tr>
            <td>`.g__cell-auto--{{ key }}`</td>
            <td>`auto` ({{ key }})</td>
        </tr>
    {% endfor %}
</tr>
</table>






