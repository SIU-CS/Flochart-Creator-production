﻿import AddStepButton from './AddStepButton';
import Modal from 'react-modal';
import FlowchartStep from './FlowchartStep'

class Canvas extends React.Component {
    constructor() {
        super();
        this.state = {
            stepList:              [],    // list of steps as json objects
            stepComponentList:     [],    // list of steps as components
            addStepModalIsOpen:    false, // boolean check for add step modal
            editStepModalIsOpen:   false, // boolean check for edit step modal
            deleteStepModalIsOpen: false, // boolean check for delete step modal
            titleText:             "",    // placeholder for new step's title
            descriptionText:       ""     // placeholder for new step's descrtiption
        }
        this.openAddStepModal             = this.openAddStepModal.bind(this);
        this.closeAddStepModal            = this.closeAddStepModal.bind(this);
        this.openEditStepModal            = this.openEditStepModal.bind(this);
        this.closeEditStepModal           = this.closeEditStepModal.bind(this);
        this.openDeleteStepModal          = this.openDeleteStepModal.bind(this);
        this.closeDeleteStepModal         = this.closeDeleteStepModal.bind(this);
        this.handleDescriptionChange      = this.handleDescriptionChange.bind(this);
        this.handleTitleChange            = this.handleTitleChange.bind(this);
        this.addStep                      = this.addStep.bind(this);
        this.editStep                     = this.editStep.bind(this);
        this.deleteStep                   = this.deleteStep.bind(this);
        this.createStepComponent          = this.createStepComponent.bind(this);
        this.createComponentsFromStepList = this.createComponentsFromStepList.bind(this);
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

    openAddStepModal(parentId) {
        /** Open "Add Step" Modal
         *    Opens the modal form for adding a step
         */
        this.setState({
            addStepModalIsOpen: true,
            stepComponentList:  this.editOverlay(false),
            parentId:           parentId
        });
    }

    closeAddStepModal() {
        /** Close "Add Step" Modal
         *    Closes the modal form for adding a step
         */
        this.setState({
            addStepModalIsOpen:  false,
            descriptionText:     "",
            stepComponentList:   this.editOverlay(true),
            titleText:           "",
            parentId:            -1,
            newChildId:          -1
        });
    }

    openEditStepModal(stepId) {
        /** Open "Edit Step" Modal
         *    Opens the modal form for editting a step
         */
        let titleText, descriptionText;
        for (let step of this.state.stepList) {
            if (step && step.id === stepId) {
                titleText = step.title;
                descriptionText = step.description;
            }
        }
        this.setState({
            editStepModalIsOpen:  true,
            stepComponentList:    this.editOverlay(false),
            editStepId:           stepId,
            titleText:            titleText,
            descriptionText:      descriptionText
        });
    }

    closeEditStepModal() {
        /** Close "Edit Step" Modal
         *    Closes the modal form for editting a step
         */
        this.setState({
            editStepModalIsOpen:  false,
            descriptionText:      "",
            stepComponentList:    this.editOverlay(true),
            titleText:            "",
            parentId:             -1,
            newChildId:           -1,
            editStepId:           -1
        });
    }

    openDeleteStepModal(stepId) {
        /** Open "Delete Step" Modal
         *    Opens the modal form for deleting a step
         */
        this.setState({
            deleteStepModalIsOpen: true,
            stepComponentList:      this.editOverlay(false),
            deleteStepId:          stepId
        });
    }

    closeDeleteStepModal() {
        /** Close "Delete Step" Modal
         *    Closes the modal form for deleting a step
         */
        this.setState({
            deleteStepModalIsOpen: false,
            stepComponentList:      this.editOverlay(true),
            deleteStepId:          -1
        });
    }

    /**************************************************************
     * FORM SUBMISSION FUNCTIONS
     *************************************************************/

    editStep(event) {
        event.preventDefault();
        let newStepList = this.state.stepList;
        newStepList = newStepList.map((step) => {
            if (step.id === this.state.editStepId) {
                step.title = this.state.titleText;
                step.description = this.state.descriptionText;
            }
            return step;
        });
        this.createComponentsFromStepList(newStepList);
        this.closeEditStepModal();
    }

    deleteStep(event) {
        /** Delete Step
         *    Main driver for delete step form. Called on "Delete Step" form submit
         */
        event.preventDefault();
        if (this.state.deleteStepId > -1) {
            let newStepList = this.state.stepList.filter((step) => {
                return step.id !== this.state.deleteStepId
            });
            if (newStepList.length === 0) {
            }
            this.createComponentsFromStepList(newStepList);
        }
        this.closeDeleteStepModal();
    }

    addStep(event) {
        /** Add New Step
         *    Main driver for add step form. Called on "Add Step" form submit
         */
        event.preventDefault();
        let newChildId, newStep, newStepList;

        newStepList = this.state.stepList;
        newChildId  = newStepList.length;
        newStep     = {
            title:       this.state.titleText,
            description: this.state.descriptionText,
            key:         newChildId,
            children:    [],
            id:          newChildId
        };

        // take care of any parent/children logic
        if (this.state.parentId > -1) {
            newStep.parentId = this.state.parentId; // set the parent id on the new step
            newStepList = newStepList.map((step) => {
                if (step &&
                    step.id === this.state.parentId ) {
                    step.children.push(newChildId); // add the new child to the parent
                }
                return step;
            });
        }

        // add new step to list
        newStepList.push(newStep);

        // create components and update state
        this.createComponentsFromStepList(newStepList);

        this.closeAddStepModal(); // close the model and show the new step
    }

    /**************************************************************
     * INTERMEDIARY FUNCTIONS
     *************************************************************/


    createComponentsFromStepList(stepList) {
        /** Create Components From Step List
         *    Create a list of step components based on json objects stored in state
         *
         *  @info: updates this.state.stepComponentList and this.state.stepList
         */

        let stepComponentList = [];

        // create a list of components based on the json objects
        if (stepList.length) {
            stepComponentList = stepList.map((step) => {
                return this.createStepComponent(step);
            });
            // update the step list and the step component list
            this.setState({
                stepList: stepList,
                stepComponentList: stepComponentList
            });
        }
        else {
            // if there are no steps left, show the new step button
            this.setState({
                stepComponentList: <AddStepButton handleClick={() => { this.openAddStepModal() }} />,
                stepList: [],
            });
        }

    }

    createStepComponent(newStep) {
        /** Create Step Component
         *    Takes in a json step object and creates a React component for it
         */
        return (
            // this is the fingerprint of a step
            <FlowchartStep
                title       = {newStep.title}
                description = {newStep.description}
                key         = {newStep.key}
                addStep     = {this.openAddStepModal}
                editStep    = {this.openEditStepModal}
                deleteStep = {this.openDeleteStepModal}
                parentId    = {newStep.parentId}
                children    = {newStep.children}
                id          = {newStep.id} />
        );
    }

    /**************************************************************
     * REACT FUNCTIONS
     *************************************************************/

    componentDidMount() {
        /** React Function
         *    Sets canvas to a "new step" button, or adds steps from
         *    either props or state
         */
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
            // if there are any steps passed to props, render those
            this.createStepComponents();
        }
        else if (this.state.stepList &&
                 this.state.stepList.length > 0) {
            // if there is a step list stored in state,  render the components
            this.createComponentsFromStepList(this.state.stepList);

        }
        else {
            // if no steps are in the props or the state, just show the initial new step button
            this.setState({
                stepComponentList: <AddStepButton handleClick={() => { this.openAddStepModal() }} />
            });
        }
    }

    render() {
        return (
            <div className="flowchart-canvas">
                {/*************************************************************
                  *  Flowchart Steps
                  *************************************************************/}
                {this.state.stepComponentList}



                {/*************************************************************
                  *  Add Step Modal
                  *************************************************************/}

                <Modal isOpen={this.state.addStepModalIsOpen}
                       onRequestClose={this.closeAddStepModal}
                       contentLabel="Add Step Modal">
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
                            <button className="btn btn-success" onClick={this.addStep}>Add Step</button>
                        </div>
                    </form>
                </Modal>

                {/*************************************************************
                  *  Edit Step Modal
                  *************************************************************/}
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
                            <button className="btn btn-success" onClick={this.editStep}>Edit Step</button>
                        </div>
                    </form>
                </Modal>

                {/*************************************************************
                  *  Delete Step Modal
                  *************************************************************/}

                <Modal isOpen={this.state.deleteStepModalIsOpen}
                       onRequestClose={this.closeDeleteStepModal}
                       contentLabel="Delete Step Modal">
                    <button onClick={this.deleteStep} className="btn btn-warning">Delete Step</button>
                    <button onClick={this.closeDeleteStepModal} className="btn btn-default">Cancel</button>
                </Modal>
            </div>
        );
    }
}
export default Canvas;
