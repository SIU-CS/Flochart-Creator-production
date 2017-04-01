import AddStepButton from './AddStepButton';

class FlowchartNav extends React.Component {
    render() {
        return (
            <div className="flowchart-nav">
                <form action={this.props.url} method="post">
                    <input name="id" type="hidden" value={this.props.id}/>
                    <input name="Steps" type="hidden" value={this.props.stepList}/>
                    <button id="save-flowchart-button"
                            className="btn btn-success"
                            type="submit">
                        Save <br/>Flowchart
                </button>
                </form>
                <AddStepButton handleClick={this.props.openAddStepModal()} />
            </div>
        )
    }
}
export default FlowchartNav;
