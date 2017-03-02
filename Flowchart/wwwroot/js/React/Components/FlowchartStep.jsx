class FlowchartStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            children: []
        }
    }
    componentDidMount() {
        this.setState ({
            id: this.props.id,
            title: this.props.title,
            description: this.props.description
        });
    }
    render() {
        return (
            <div className="flowchart-step-container">
                <p className="flowchart-step-title">{this.state.title}</p>
                <hr/>
                <p className="flowchart-step-description">{this.state.description}</p>
            </div>
        )
    }
}
export default FlowchartStep;