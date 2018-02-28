/**
 * GA Event tracking
 */

/**
 * Helpers
 */

/**
 * isLink helper
 * @param  {DOMNode} node
 * @return {Boolean}
 */
const isLink = node => node.nodeName == 'A';

/**
 * isInternalLink helper
 *
 * Does this anchor link to a URL inside the current page's domain?
 *
 * @param  {DOMNode} node
 * @return {Boolean}
 */
const isInternalLink = (node) => (node.hostname === document.location.hostname);

/**
 * isExternalLink helper
 *
 *  Does this anchor link to a URL outside the current page's domain?
 *
 * @param  {DOMNode} node
 * @return {Boolean}
 */
const isExternalLink = (node) => !isInternalLink(node);

/**
 * isInPageLink helper
 *
 * Does this anchor link to an anchor inside the current page?
 *
 * @param  {DOMNode} node
 * @return {Boolean}
 */
const isInPageLink = (node) => isLink(node)
                                && isInternalLink(node)
                                && node.pathname === document.location.pathname
                                && node.hash.length;

/**
 * isDownloadLink helper
 *
 * Does this anchor link to download?
 *
 * @param  {DOMNode} node
 * @return {Boolean}
 */
const isDownloadLink = (node) => node.hasAttribute('download');


/**
 * Track an event
 * @param  {Object} opts Params for ga.track
 */
const track = ({ category, action = 'click', label = null, value = null }) => {
    if (window.ga) {
        window.ga('send', 'event', category, action, label, value);
    } else {
        console.log('[ga-debug] send', 'event', category, action, label, value);
    }
}

/**
 * Track external link clicks
 */
const handleExternalClick = (e) => {
    const node = e.target;

    if (isLink(node) && isExternalLink(node)) {
        track({
            category: 'External link',
            label: node.href,
        });
    }
};


/**
 * Track download link clicks
 */
const handleDownloadClick = (e) => {
    const node = e.target;

    if (isLink(node) && isDownloadLink(node)) {
        track({
            category: 'Download',
            label: node.href,
        });
    }
};


/**
 * Track TOC link clicks
 */
const handleTocClick = (e) => {
    const node = e.target;

    if(isInPageLink(node)) {
        track({
            category: 'TOC link',
            label: `${document.location.pathname}${node.hash}`,
        });
    }
}

/**
 * Bind to DOM
 */
export default function() {
    document.addEventListener('click', (e) => handleExternalClick(e));

    document.addEventListener('click', (e) => handleDownloadClick(e));

    const toc = document.querySelector('#toc');

    if (toc) {
        toc.addEventListener('click', (e) => handleTocClick(e));
    }
};
