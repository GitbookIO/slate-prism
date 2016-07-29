const Prism = require('prismjs');
const Slate = require('slate');

/**
 * Default filter for code blocks
 * @param {Node} node
 * @return {Boolean}
 */
function defaultOnlyIn(node) {
    return node.type === 'code_block';
}

/**
 * Default getter for syntax
 * @param {Node} node
 * @return {String}
 */
function defaultGetSyntax(node) {
    return 'javascript';
}

/**
 * A Slate plugin to handle keyboard events in code blocks.
 * @return {Object}
 */

function PrismPlugin(opts) {
    opts = opts || {};
    opts.onlyIn = opts.onlyIn || defaultOnlyIn;
    opts.getSyntax = opts.getSyntax || defaultGetSyntax;

    function renderDecorations(text, block) {
        if (!opts.onlyIn(block)) {
            return text.characters;
        }

        let characters = text.characters.asMutable();
        const string = text.text;
        const grammarName = opts.getSyntax(block);
        const grammar = Prism.languages[grammarName];

        if (!grammar) {
            return text.characters;
        }

        const tokens = Prism.tokenize(string, grammar);
        let offset = 0;

        function addMark(start, end, className) {
            for (let i = start; i < end; i++) {
                let char = characters.get(i);
                let { marks } = char;
                marks = marks.add(Slate.Mark.create({ type: 'prism-token', data: { className } }));
                char = char.merge({ marks });
                characters = characters.set(i, char);
            }
        }

        function processToken(token, accu) {
            accu = accu || '';

            if (typeof token === 'string') {
                if (accu) {
                    addMark(offset, offset + token.length, 'prism-token token ' + accu);
                }
                offset += token.length;
            }

            else {
                accu = accu + ' ' + token.type + ' ' + (token.alias || '');

                if (typeof token.content === 'string') {
                    addMark(offset, offset + token.content.length, 'prism-token token ' + accu);
                    offset += token.content.length;
                }

                // When using token.content instead of token.matchedStr, token can be deep
                else {
                    for (var i =0; i < token.content.length; i++) {
                        processToken(token.content[i], accu);
                    }
                }
            }
        }

        for (var i =0; i < tokens.length; i++) {
            processToken(tokens[i]);
        }

        return characters.asImmutable();
    }

    return {
        renderDecorations
    };
}

module.exports = PrismPlugin;
