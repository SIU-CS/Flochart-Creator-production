import AddStepButton from './AddStepButton';
import Modal from 'react-modal';
import FlowchartStep from './FlowchartStep'

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
        this.createStepComponent = this.createStepComponent.bind(this);
    }

    componentDidMount() {
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else if (this.state.stepList &&
            this.state.stepList.length > 0) {
            this.setState({
                body: this.state.stepList
            });

        }
        else {
            this.setState({
                body: <AddStepButton handleClick={() => { this.openModal() }} />
            });
        }
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
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    createStepComponentList() {
        // TODO pull in parser data and create step components
    }

    createStepComponent() {
        return (
        <FlowchartStep title={this.state.titleText}
            description={this.state.descriptionText} 
            key={this.state.stepList.length}
            id={this.state.stepList.length} />
        );
    }

    addToStepList(newStep) {
        let stepList = this.state.stepList;
        stepList.push(newStep);
        this.setState({
            stepList: stepList,
            body: stepList,
            titleText: "",
            descriptionText: ""
        });
    }

    addNewStep(event) {
        event.preventDefault();
        let newStep = this.createStepComponent();
        this.addToStepList(newStep);
        this.closeModal();
    }

    render() {
        return (
            <div>
                {this.state.body}




                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="New Step Modal">
                    <form>
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
                            <button className="btn btn-success" onClick={this.addNewStep}>Add Step</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default Canvas;
