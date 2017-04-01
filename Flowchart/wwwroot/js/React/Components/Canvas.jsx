import AddStepButton   from './AddStepButton';
import Modal           from 'react-modal';
import FlowchartStep   from './FlowchartStep'
import FlowchartNav    from './FlowchartNav';
import AddStepModal    from './AddStepModal';
import EditStepModal   from './EditStepModal';
import DeleteStepModal from './DeleteStepModal';
import axios           from 'axios';

// set axios post header to application/json
axios.defaults.headers.post['Content-Type'] = 'application/json';


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
        this.createChildComponentsFromIds = this.createChildComponentsFromIds.bind(this);
        this.sendFlowchartData            = this.sendFlowchartData.bind(this);
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
            // remove step from steplist
            let newStepList = this.state.stepList.filter((step) => {
                return step.id !== this.state.deleteStepId
            });

            // remove and children/parent relationships
            newStepList = this.purgeChildAndParent(newStepList);

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
        newChildId  = this.getNewStepId(newStepList.length);

        newStep     = {
            title:       this.state.titleText,
            description: this.state.descriptionText,
            key:         newChildId,
            children:    [],
            parentId:    null,
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

    sendFlowchartData() {
        /** sendFlowchartData
         *
         * This function makes a post request to /Flowchart/Edit/{id}.
         * It sends the step list as an array of JSON objects.
         */

        let url = window.location.href; // get the url for the id
        url = url.split("/"); // make an array, splitting url on '/'
        url = url[url.length-1]; // get just the id in the url

        let stepList = this.state.stepList.map((step) => {
            let newStep = {
                id: step.id,
                title: step.title,
                description: step.description,
                children: step.children
            }
            return newStep;
        });

        let objectToSend = {
            id: this.state.id,
            Steps: stepList
        }

        axios.post('/Flowchart/Edit/'+url, { // post
            data: objectToSend // send step list in "data" JSON object
        })
             .then(function (response) {
                 console.log("Success");
                 console.log(response);
             })
             .catch(function (error) {
                 console.log("Error");
                 console.log(error);
             });
    }

    /**************************************************************
     * INTERMEDIARY FUNCTIONS
     *************************************************************/

    getNewStepId(potentialId) {
        /* My own "auto-increment" function.
         * Recursively searches for an id for new steps.
         *
         * 1. Start with a seed value: potentialId
         * 2. Check for any conflicts with the seed value
         * 3. If a conflict is found, increment seed value and recursivley call the function
         */

        for (let step of this.state.stepList) {
            if (step.id === potentialId) {
                potentialId = this.getNewStepId(potentialId+1);
            }
        }
        return potentialId;
    }

    purgeChildAndParent(stepList) {
        /* Take care of child/parent relationships after step deletion */
        return stepList.map((step) => {

            // remove parent id if parent is being deleted
            if (step.parentId === this.state.deleteStepId)
                step.parentId = null;

            // remove child id from children if child is being deleted
            let childIndex = step.children.indexOf(this.state.deleteStepId);
            if (childIndex >= 0)
                step.children.splice(childIndex, 1);

            return step;
        });
    }

    createComponentsFromStepList(stepList) {
        /** Create Components From Step List
         *    Create a list of step components based on json objects stored in state
         *
         *  @info: updates this.state.stepComponentList and this.state.stepList
         */

        let stepComponentList = [];

        // create a list of components based on the json objects
        if (stepList.length > 0) {
            stepComponentList = stepList
                .filter((step) => { // only show top-level steps
                    return step.parentId === null;
                })
                .map((step) => {    // create components for each top-level step
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
                stepList: [],
                stepComponentList: []
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
                deleteStep  = {this.openDeleteStepModal}
                getChildrenById = {this.getChildrenById}
                parentId   = {newStep.parentId}
                children    = {newStep.children}
                createChildComponents = {this.createChildComponentsFromIds}
                id          = {newStep.id} />
        );
    }

    createChildComponentsFromIds(childIdList) {
        /* Passed down to steps.
         * Steps can then "call up" to the canvas to create
         * components for their children.
         */

        // get all the children objects
        let childObjectList = this.getChildrenById(childIdList);

        // create components for the objects
        let childComponentList = childObjectList.map((child) => {
            return this.createStepComponent(child);
        });
        return childComponentList;
    }

    getChildrenById(childIdList) {
        /* Get all the steps that match ids in an array */

        let childList = this.state.stepList.filter((step) => { // for all the step objects...
            // only include those that match an id in the array
            return childIdList.includes(step.id);
        });
        return childList; // return list of step objects
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
                stepList: []
            });
        }
    }

    /**************************************************************
     * MODAL FUNCTIONS
     *************************************************************/

    handleTitleChange(event) {
        /** Handle Title Change
         *    When users edit the title input on the modal form, this function is called
         */

        /* TODO check title length*/
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
            deleteStepId:          stepId
        });
    }

    closeDeleteStepModal() {
        /** Close "Delete Step" Modal
         *    Closes the modal form for deleting a step
         */
        this.setState({
            deleteStepModalIsOpen: false,
            deleteStepId:          -1
        });
    }

    render() {
        return (
            <div className="flowchart-canvas">
                <FlowchartNav openAddStepModal={() => this.openAddStepModal}
                              sendFlowchartData={() => this.sendFlowchartData}/>

                {/*************************************************************
                  *  Flowchart Steps
                  *************************************************************/}
                {this.state.stepComponentList}

                {/*************************************************************
                  *  Modals
                  *************************************************************/}

                <AddStepModal addStepModalIsOpen={this.state.addStepModalIsOpen}
                              closeAddStepModal={() => this.closeAddStepModal}
                              titleText={this.state.titleText}
                              handleTitleChange={() => this.handleTitleChange}
                              descriptionText={this.state.descriptionText}
                              handleDescriptionChange={() => this.handleDescriptionChange}
                              addStep={() => this.addStep} />

                <EditStepModal editStepModalIsOpen={this.state.editStepModalIsOpen}
                               closeEditStepModal={() => this.closeEditStepModal}
                               handleTitleChange={() => this.handleTitleChange}
                               handleDescriptionChange={() => this.handleDescriptionChange}
                               editStep={() => this.editStep}
                               titleText={this.state.titleText}
                               descriptionText={this.state.descriptionText} />

                <DeleteStepModal deleteStepModalIsOpen={this.state.deleteStepModalIsOpen}
                                 deleteStep={() => this.deleteStep}
                                 closeDeleteStepModal={() => this.closeDeleteStepModal}
                                 closeDeleteStepModal={() => this.closeDeleteStepModal} />
            </div>
        );
    }
}
export default Canvas;
