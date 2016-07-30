const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const Prism = require('../');

const stateJson = require('./state');

const plugins = [
    Prism({
        onlyIn: (node => node.type === 'code_block'),
        getSyntax: (node => node.data.get('syntax')) 
    })
];

const NODES = {
    code_block: props => <pre><code {...props.attributes}>{props.children}</code></pre>
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

    renderNode: function(node) {
        return NODES[node.type];
    },

    render: function() {
        return (
            <Slate.Editor
                placeholder={'Enter some text...'}
                plugins={plugins}
                state={this.state.state}
                onChange={this.onChange}
                renderNode={this.renderNode}
            />
    );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
