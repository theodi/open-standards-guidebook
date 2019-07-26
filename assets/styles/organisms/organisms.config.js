module.exports  = {
    collator: function(markup, item) {
        return `<!-- Start: @${item.handle} -->\n
                <h3><code>${item.label}</code></h4>\n
                <div style="padding-bottom:20px">\n
                    ${markup}\n
                </div>\n
                <!-- End: @${item.handle} -->\n`
    }
}
