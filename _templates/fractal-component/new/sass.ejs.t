---
to: assets/components/<%= type %>s/<%= slug %>/_<%= slug %>.scss
---
// ==========================================================================
// <%= h.capitalize(slug) %> <%= type %>
// ==========================================================================

<% var prefix = '' -%>
<% var hasClass = true -%>
<% switch(type)  {
    case 'molecule':
        prefix = 'm-';
        break;
    case 'form':
        prefix = 'f-';
        break;
    case 'tool':
        hasClass = false;
        break;
    case 'util':
        prefix = 'u-';
        break;
    default:
        prefix = '';
        break;
} -%>

<% if (hasClass) { -%>
.<%= prefix %><%= slug %> {
    // <%= type %> styles here
}
<% } -%>
