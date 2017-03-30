import AddStepButton from './AddStepButton';

class FlowchartNav extends React.Component {
    render() {
        return (
            <div className="flowchart-nav">
                <button id="save-flowchart-button"
                        className="btn btn-success"
                        onClick={this.props.sendFlowchartData()}>
                    Save <br/>Flowchart
                </button>
                <AddStepButton handleClick={this.props.openAddStepModal()} />
            </div>
        )
    }
}
export default FlowchartNav;
