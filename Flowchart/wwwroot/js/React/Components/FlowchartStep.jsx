class FlowchartStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            children: []
        }
        this.addNewStep = this.addNewStep.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            overlayEnabled: true

        });
    }

    addNewStep() {
        this.setState({
            overlayEnabled: false
        });
        this.props.addNewStep(() => {
            this.setState({overlayEnabled: true});
        });
    }

    render() {
        return (
            <div className="flowchart-step-container">

                <div className="flowchart-overlay" style={{zIndex: this.props.overlayEnabled ? 1 : 0}} >
                    {/* Overlay on top of the step */}
                    <button className="btn edit-step-btn btn-warning">
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button onClick={this.addNewStep} className="btn add-child-btn btn-success">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <button className="btn delete-step-btn btn-danger">
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div>

                <div className="flowchart-contents" >
                    {/* Actual content of the step */}
                    <p className="flowchart-step-title">{this.state.title}</p>
                    <hr />
                    <p className="flowchart-step-description">{this.state.description}</p>
                </div>

            </div>
        )
    }
}
export default FlowchartStep;
