import AddStepButton from './AddStepButton';
import Modal from 'react-modal';

class Canvas extends React.Component {
    constructor() {
        super();
        this.state = {
            stepList: [],
            body: [],
            modalIsOpen: false,
            titleText: "",
            descriptionText: ""
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addNewStep = this.addNewStep.bind(this);
    }

    componentDidMount() {
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else {
            this.setState({
                body: <AddStepButton handleClick={() => { this.openModal() }} />
            });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    createStepComponents() {
    }

    handleTitleChange(event) {
        this.setState({
            titleText: event.target.value
        });
    }
    handleDescriptionChange(event) {
        this.setState({
            descriptionText: event.target.value
        });
    }

    addNewStep() {
        console.log(this.state.titleText);
        console.log(this.state.descriptionText);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {this.state.body}
                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="New Step Modal">

                    <form >
                        <div className="form-horizontal">
                            <h4>Add New Step</h4>
                            <hr />
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="Title">Title</label>
                                <div className="col-md-10">
                                    <input htmlFor="Title"
                                        id="Title"
                                        className="form-control"
                                        value={this.state.titleText}
                                        onChange={this.handleTitleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="Description">Description</label>
                                <div className="col-md-10">
                                    <textarea rows="5"
                                        id="Description"
                                        htmlFor="Description"
                                        className="form-control"
                                        value={this.state.descriptionText}
                                        onChange={this.handleDescriptionChange} />
                                </div>
                            </div>
                            <div className="form-validation-error">{this.state.validationError}</div>
                            <button className="btn btn-success" onClick={this.addNewStep}>Add Step</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default Canvas;
