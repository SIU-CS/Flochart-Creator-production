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
        this.openModal               = this.openModal.bind(this);
        this.closeModal              = this.closeModal.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange       = this.handleTitleChange.bind(this);
        this.addNewStep              = this.addNewStep.bind(this);
        this.createStepComponent     = this.createStepComponent.bind(this);
        this.createComponentsFromStepList     = this.createComponentsFromStepList.bind(this);
    }

    componentDidMount() {
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else if (this.state.stepList &&
            this.state.stepList.length > 0) {
            this.createComponentsFromStepList();

        }
        else {
            this.setState({
                body: <AddStepButton handleClick={() => { this.openModal() }} />
            });
        }
    }

    // Modal Stuff
    handleTitleChange(event) {
        this.setState({ titleText: event.target.value });
    }
    handleDescriptionChange(event) {
        this.setState({ descriptionText: event.target.value });
    }
    openModal() {
        let newBody = this.state.body;
        if (Array.isArray(newBody))
            newBody = newBody.map((step) => {
                return React.cloneElement(step, {overlayEnabled: false})
            });
        this.setState({
            modalIsOpen: true,
            body: newBody
        });
    }
    closeModal() {
        let newBody = this.state.body;
        if (Array.isArray(newBody))
            newBody = newBody.map((step) => {
                return React.cloneElement(step, {overlayEnabled: true})
            });
        this.setState({
            modalIsOpen: false,
            descriptionText: "",
            body: newBody,
            titleText: ""
        });
    }

    // Step functionality
    createStepComponentList() {
        // TODO pull in parser data and create step components
    }

    createComponentsFromStepList() {
        console.log(this.state.stepList);
        let stepComponentList = [];

        stepComponentList = this.state.stepList.map((step) => {
            return this.createStepComponent(step);
        });

        this.setState({
            body: stepComponentList
        });
    }

    createStepComponent(newStep) {
        return (
            <FlowchartStep title={newStep.title}
                           description={newStep.description}
                           key={newStep.key}
                           addNewStep= {this.openModal}
                           overlayEnabled={true}
                           id={newStep.id} />
        );
    }

    addToStepList(newStep) {
        let stepList = this.state.stepList;
        stepList.push(newStep);
        this.setState({
            stepList: stepList
        }, this.createComponentsFromStepList);
    }

    addNewStep(event, callback) {
        event.preventDefault();
        let newStep = {
            title: this.state.titleText,
            description: this.state.descriptionText,
            key: this.state.stepList.length,
            overlayEnabled: true,
            id: this.state.stepList.length
        };
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
