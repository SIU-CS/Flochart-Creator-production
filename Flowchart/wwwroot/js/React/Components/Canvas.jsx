import AddStepButton from './AddStepButton';
import Modal from 'react-modal';
import FlowchartStep from './FlowchartStep'

class Canvas extends React.Component {
    constructor() {
        super();
        this.state = {
            stepList: [],
            stepComponentList: [],
            newStepModalIsOpen: false,
            titleText: "",
            descriptionText: ""
        }
        this.openNewStepModal               = this.openNewStepModal.bind(this);
        this.closeNewStepModal              = this.closeNewStepModal.bind(this);
        this.openEditStepModal               = this.openEditStepModal.bind(this);
        this.closeEditStepModal              = this.closeEditStepModal.bind(this);
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
                stepComponentList: <AddStepButton handleClick={() => { this.openNewStepModal() }} />
            });
        }
    }

    // Modal Stuff
    editOverlay(boolean) {
        let newStepComponentList = this.state.stepComponentList;
        if (Array.isArray(newStepComponentList))
            newStepComponentList = newStepComponentList.map((step) => {
                return React.cloneElement(step, {overlayEnabled: boolean})
            });
        return newStepComponentList;
    }

    handleTitleChange(event) {
        this.setState({ titleText: event.target.value });
    }
    handleDescriptionChange(event) {
        this.setState({ descriptionText: event.target.value });
    }
    openNewStepModal(parentId) {
        this.setState({
            newStepModalIsOpen: true,
            stepComponentList: this.editOverlay(false),
            parentId: parentId
        });
    }
    closeNewStepModal() {
        this.setState({
            newStepModalIsOpen: false,
            descriptionText: "",
            stepComponentList: this.editOverlay(true),
            titleText: "",
            parentId: -1,
            newChildId: -1
        });
    }

    openEditStepModal(stepId) {
        let stepTitle, stepDescription;
        for (let step of this.state.stepList) {
            if (step && step.id === stepId) {
                stepTitle = step.title;
                stepDescription = step.description;
            }
        }
        this.setState({
            editStepModalIsOpen: true,
            stepComponentList: this.editOverlay(false),
            editStepId: stepId,
            titleText: stepTitle,
            descriptionText: stepDescription
        });
    }

    closeEditStepModal() {
        this.setState({
            editStepModalIsOpen: false,
            descriptionText: "",
            stepComponentList: this.editOverlay(true),
            titleText: "",
            parentId: -1,
            newChildId: -1,
            editStepId: -1
        });
    }

    createComponentsFromStepList() {
        let stepComponentList = [];

        stepComponentList = this.state.stepList.map((step) => {
            if (this.state.parentId > -1 &&
                step &&
                step.id === this.state.parentId &&
                this.state.newChildId) {
                step.children.push(this.state.newChildId);
            }
            return this.createStepComponent(step);
        });

        this.setState({
            stepComponentList: stepComponentList
        });
    }

    createStepComponent(newStep) {
        return (
            <FlowchartStep title={newStep.title}
                           description={newStep.description}
                           key={newStep.key}
                           addNewStep= {this.openNewStepModal}
                           editStep={this.openEditStepModal}
                           parentId={newStep.parentId}
                           children={newStep.children}
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

    addNewStep(event) {
        event.preventDefault();
        let newStep = {
            title: this.state.titleText,
            description: this.state.descriptionText,
            key: this.state.stepList.length,
            children: [],
            id: this.state.stepList.length
        };
        if (this.state.parentId > -1) {
            this.setState({
                newChildId: this.state.stepList.length
            });
            newStep.parentId = this.state.parentId
        }
        this.addToStepList(newStep);
        this.closeNewStepModal();
    }

    render() {
        return (
            <div>
                {this.state.stepComponentList}

                <Modal isOpen={this.state.editStepModalIsOpen}
                    onRequestClose={this.closeEditStepModal}
                    contentLabel="Edit Step Modal">
                    <form>
                        <div className="form-horizontal">
                            <h4>Edit Step</h4>
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
                <Modal isOpen={this.state.newStepModalIsOpen}
                    onRequestClose={this.closeNewStepModal}
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
