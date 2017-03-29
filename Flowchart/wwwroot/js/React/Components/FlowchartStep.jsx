class FlowchartStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            children: [],
            parentId: null,
            childComponents: []
        }
        this.drawLines = this.drawLines.bind(this);
    }

    componentDidMount() {
        let childComponents = this.state.chlidren;
        childComponents = this.props.createChildComponents(this.props.children);

        this.setState({
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            parentId: this.props.parentId,
            childComponents: childComponents,
            children: this.props.children || this.state.children
        }, this.drawLines());
    }

    componentWillReceiveProps(nextProps) {
        let childComponents = this.props.createChildComponents(nextProps.children);
        this.setState({
            childComponents: childComponents
        }, this.drawLines());
    }

    drawLines() {
        if (this.props.children.length > 1) {
            this.setState({
                horLineWidth: 270*(this.props.children.length-1) + "px",
                botLineHeight: "12px"
            });
        }
        else if(this.props.children.length === 1) {
            this.setState({
                horLineWidth: "0px",
                botLineHeight: "12px"
            });
        }
        else{
            this.setState({
                horLineWidth: "0px",
                botLineHeight: "0px"
            });
        }
        if (this.props.parentId !== null) {
            this.setState({
                topLineHeight: "12px"
            });
        }
    }

    render() {
        return (
            <div className="flowchart-step-wrapper">
                <div className="hor-line" style={{width: this.state.horLineWidth}}></div>
                <div className="top-vert-line" style={{height: this.state.topLineHeight}}></div>
                <div className="bot-vert-line" style={{height: this.state.botLineHeight}}></div>
                <div className="flowchart-step">
                    <div className="flowchart-overlay" >
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
                <br/><br/>
                {this.state.childComponents}
            </div>
        )
    }
}
export default FlowchartStep;
