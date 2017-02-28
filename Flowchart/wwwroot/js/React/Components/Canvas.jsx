import AddStepButton from './AddStepButton';
class Canvas extends React.Component {
    construtctor() {
        this.state = {
            stepList: [],
            body: []
        }
    }

    componentDidMount() {
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
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
                <AddStepButton />
            </div>
        );
    }
}
ReactDOM.render(
    <Canvas />,
    document.getElementById('flowchart-canvas')
);



