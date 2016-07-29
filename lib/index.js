
/**
 * Default filter for code blocks
 * @param {Node} node
 * @return {Boolean}
 */
function defaultOnlyIn(node) {
    return node.type === 'code_block';
}

/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @return {Object}
 */

function Prism(opts) {
    opts = opts || {};
    opts.onlyIn = opts.onlyIn || defaultOnlyIn;



    return {
        
    };
}

module.exports = Prism;
