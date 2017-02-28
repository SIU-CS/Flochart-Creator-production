let AddStepButton = require('./AddStepButton')
class Canvas extends React.Component {
    construtctor() {
        this.state = {
            stepList: [],
            body: []
        }
    }

    componentDidMountjj() {
        if (this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else {
            this.setState({
                body: <AddStepButton />
            });
        }
    }

    createStepComponents() {
    }

    render() {
        return (
            <div>
            {this.state.body}
            </div>
        );
    }
}
ReactDOM.render(
    <Canvas />,
    document.getElementById('flowchart-canvas')
);



