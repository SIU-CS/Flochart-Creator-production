class FlowchartStep extends React.Component {
    /* The actual step. Also handles rendering of any children.*/

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            children: [],
            parentId: -1,
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
                botLine: "2px solid black"
            });
        }
        else if(this.props.children.length === 1) {
            this.setState({
                botLine: "2px solid black"
            });
        }
        else{
            this.setState({
                horLine: "0px solid black",
                botLine: "0px solid black"
            });
        }
        if (this.props.parentId !== -1) {
            this.setState({
                topLine: "2px solid black",
                horLine: "2px solid black"
            });
        }
        if (this.props.isLeftChild && this.props.isRightChild ) {
            this.setState({
                horLineMaxWidth: '0%'
            });
        }
        else if (this.props.isLeftChild) {
            this.setState({
                horLineOffset: '50%',
                horLineMaxWidth: '50%'
            });
        }
        else if (this.props.isRightChild) {
            this.setState({
                horLineOffset: '-50%',
                horLineFloat: 'left'
            });
        }
    }

    render() {
        return (
            <div className="flowchart-step-wrapper">

                {/* The connecting lines */}
            <div className="hor-line"
                 style={{marginLeft: this.state.horLineOffset,
                         maxWidth: this.state.horLineMaxWidth,
                         borderTop: this.state.horLine}}>
            </div>
                <div className="top-vert-line" style={{borderLeft: this.state.topLine}}></div>
                <div className="bot-vert-line" style={{borderLeft: this.state.botLine}}></div>

                {/* The step itself */}
                <div className="flowchart-step">

                    {/* Overlay on top of the step */}
                    <div className="flowchart-overlay" >
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

                    {/* Actual content of the step */}
                    <div className="flowchart-contents" >
                        <p className="flowchart-step-title">{this.props.title}</p>
                        <hr />
                        <p className="flowchart-step-description">{this.props.description}</p>
                    </div>
                </div>
                <br/><br/>

                {/* Render the children */}
                {this.state.childComponents}
            </div>
        )
    }
}
export default FlowchartStep;
