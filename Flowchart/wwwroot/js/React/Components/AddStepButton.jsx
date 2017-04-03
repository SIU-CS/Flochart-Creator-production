class AddStepButton extends React.Component {
    /* The button to add a new top-level step*/

    render() {
        return (
            <div>
                <button onClick={this.props.handleClick}
                        className="btn btn-success add-step-btn">
                    <p>
                        <span className="glyphicon glyphicon-plus"></span>
                    </p>
                    <p>New Step</p>
                </button>
            </div>
        )
    }
}
export default AddStepButton;
