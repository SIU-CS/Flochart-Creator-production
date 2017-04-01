import Modal from 'react-modal';
class AddStepModal extends React.Component {
    /* Handles the modal to add a step */

    render() {
        return (
                <Modal isOpen={this.props.addStepModalIsOpen}
                       onRequestClose={this.props.closeAddStepModal()}
                       contentLabel="Add Step Modal">
                    <form>
                        <div className="form-horizontal">
                            <h4 className="modal-text">Add New Step</h4>
                            <hr />
                            <div className="form-group">
                                <label className=" modal-text col-md-12" htmlFor="Title">Title</label>
                                <div className="col-md-12">
                                    <input htmlFor="Title"
                                           id="Title"
                                           className="form-control modal-input"
                                           value={this.props.titleText}
                                           onChange={this.props.handleTitleChange()} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-12 modal-text" htmlFor="Description">Description</label>
                                <div className="col-md-12">
                                    <textarea rows="5"
                                              id="Description"
                                              htmlFor="Description"
                                              className="form-control modal-input"
                                              value={this.props.descriptionText}
                                              onChange={this.props.handleDescriptionChange()} />
                                </div>
                            </div>
                            <button className="btn btn-success modal-button" onClick={this.props.addStep()}>Add Step</button>
                        </div>
                    </form>
                </Modal>
        )
    }
}
export default AddStepModal;
