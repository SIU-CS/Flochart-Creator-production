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
        this.openNewStepModal             = this.openNewStepModal.bind(this);
        this.closeNewStepModal            = this.closeNewStepModal.bind(this);
        this.openEditStepModal            = this.openEditStepModal.bind(this);
        this.closeEditStepModal           = this.closeEditStepModal.bind(this);
        this.handleDescriptionChange      = this.handleDescriptionChange.bind(this);
        this.handleTitleChange            = this.handleTitleChange.bind(this);
        this.addNewStep                   = this.addNewStep.bind(this);
        this.editStep                     = this.editStep.bind(this);
        this.createStepComponent          = this.createStepComponent.bind(this);
        this.createComponentsFromStepList = this.createComponentsFromStepList.bind(this);
    }

    componentDidMount() {
        /** React Function
         *    Sets canvas to a "new step" button, or adds steps from
         *    either props or state
         */
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

    /**************************************************************
     * MODAL FUNCTIONS
     *************************************************************/
    editOverlay(boolean) {
        /** Edit Overlay
         *    Sets the overlayEnabled prop to <boolean> for every component
         *
         *  @info: overlayEnabled sets the overlay's z-index so it doesn't interfere with the modal
         */
        let newStepComponentList = this.state.stepComponentList;
        if (Array.isArray(newStepComponentList))
            newStepComponentList = newStepComponentList.map((step) => {
                return React.cloneElement(step, {overlayEnabled: boolean})
            });
        return newStepComponentList;
    }

    handleTitleChange(event) {
        /** Handle Title Change
         *    When users edit the title input on the modal form, this function is called
         */
        this.setState({ titleText: event.target.value });
    }
    handleDescriptionChange(event) {
        /** Handle Description Change
         *    When users edit the title input on the modal form, this function is called
         */
        this.setState({ descriptionText: event.target.value });
    }
    openNewStepModal(parentId) {
        /** Open "New Step" Modal
         *    Opens the modal form for adding a step
         */
        this.setState({
            newStepModalIsOpen: true,
            stepComponentList: this.editOverlay(false),
            parentId: parentId
        });
    }
    closeNewStepModal() {
        /** Close "New Step" Modal
         *    Closes the modal form for adding a step
         */
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
        /** Open "Edit Step" Modal
         *    Opens the modal form for editting a step
         */
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
        /** Close "Edit Step" Modal
         *    Closes the modal form for editting a step
         */
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

    deleteStep(stepId) {
        /** Delete Step
         *
         */
        let stepList = [];
        for (let step of this.state.stepList) {
            if (step.id !== stepId) {
                if (step.parentId = stepId)
                    step.parentId = -1;
                let newChildren = []
                for (let child of step.children) {
                    if (child !== stepId)
                        newChildren.push(child);
                }
                step.children = newChildren;
                stepList.push(step);
            }
        }
        this.createComponentsFromStepList();
    }

    createComponentsFromStepList() {
        /** Create Components From Step List
         *    Create a list of step components based on json objects stored in state
         *
         *  @info: updates this.state.stepComponentList
         */

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
        /** Create Step Component
         *    Takes in a json step object and creates a React component for it
         */
        return (
            <FlowchartStep title={newStep.title}
            description={newStep.description}
            key={newStep.key}
            addNewStep= {this.openNewStepModal}
            editStep={this.openEditStepModal}
            deleteStep={this.deleteStep}
            parentId={newStep.parentId}
            children={newStep.children}
            id={newStep.id} />
        );
    }

    addToStepList(newStep) {
        /** Add Step To Step List
         *    Adds a json step to this.state.steplist
         *
         *  @info: updates this.state.stepList with result and calls createComponentsFromStepList
         */
        event.preventDefault();
        let newStepList = this.state.stepList;
        newStepList = newStepList.map((step) => {
            if (step.id === this.state.editStepId) {
                step.title = this.state.titleText,
                step.description = this.state.descriptionText
            }
            return step
        });

        this.setState({
            stepList: newStepList
        }, this.createComponentsFromStepList);

        this.closeEditStepModal();
    }

    addNewStep(event) {
        /** Add New Step
         *    Main driver for add step form. Called on "Add Step" form submit
         */
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
                            <button className="btn btn-success" onClick={this.editStep}>Add Step</button>
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
                            <button className="btn btn-success" onClick={this.addNewStep}>Edit Step</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default Canvas;
