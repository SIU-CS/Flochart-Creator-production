class FlowchartStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            children: [],
            parentId: -1
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            parentId: this.props.parentId,
            children: this.props.children || this.state.children
        });
    }


    render() {
        return (
            <div className="flowchart-step-container">
                <div className="flowchart-overlay" style={{zIndex: this.props.overlayEnabled ? 1 : 0}} >
                    {/* Overlay on top of the step */}
                    <button onClick={() => this.props.editStep(this.state.id)} className="btn edit-step-btn btn-warning">
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button onClick={() => this.props.addStep(this.state.id)} className="btn add-child-btn btn-success">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <button onClick={() => this.props.deleteStep(this.state.id)} className="btn delete-step-btn btn-danger">
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div>

                <div className="flowchart-contents" >
                    {/* Actual content of the step */}
                    <p className="flowchart-step-title">{this.props.title}</p>
                    <hr />
                    <p className="flowchart-step-description">{this.props.description}</p>
                </div>
            </div>
        )
    }
}
export default FlowchartStep;
