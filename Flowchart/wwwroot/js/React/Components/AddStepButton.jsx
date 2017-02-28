class AddStepButton extends React.Component {
    componentDidMount() {
        console.log(this.props);

    }
    render() {
        return (
            <div>
                <button onClick={this.props.handleClick} className="btn add-step-btn">
                    <p><span className="glyphicon glyphicon-plus"></span></p>
                    <p>New Step</p>
                </button>
            </div>
        )
    }
}
export default AddStepButton;