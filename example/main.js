const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditCode = require('slate-edit-code');
const PluginPrism = require('../lib/');

const stateJson = require('./state');

const onlyInCode = (node => node.type === 'code_block');

const plugins = [
    PluginPrism({
        onlyIn: onlyInCode,
        getSyntax: (node => node.data.get('syntax'))
    }),
    PluginEditCode({
        onlyIn: onlyInCode
    })
];

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
    nodes: {
        code_block: {
            render: props => <pre><code {...props.attributes}>{props.children}</code></pre>
        },
        paragraph: {
            render: props => <p {...props.attributes}>{props.children}</p>
        },
        heading: {
            render: props => <h1 {...props.attributes}>{props.children}</h1>
        }
    }
};

const Example = React.createClass({
    getInitialState: function() {
        return {
            state: Slate.Raw.deserialize(stateJson, { terse: true })
        };
    },

    onChange: function(state) {
        this.setState({
            state: state
        });
    },

    render: function() {
        return (
            <Slate.Editor
                placeholder={'Enter some text...'}
                plugins={plugins}
                state={this.state.state}
                onChange={this.onChange}
                schema={schema}
            />
    );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
