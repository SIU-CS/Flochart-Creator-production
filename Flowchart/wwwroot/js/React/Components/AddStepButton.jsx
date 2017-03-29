class AddStepButton extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleClick} className="btn btn-success add-step-btn">
                    <p><span className="glyphicon glyphicon-plus"></span></p>
                    <p>New Step</p>
                </button>
            </div>
        )
    }
}
export default AddStepButton;
