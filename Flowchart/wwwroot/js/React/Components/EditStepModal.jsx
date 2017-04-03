import Modal from 'react-modal';
class EditStepModal extends React.Component {
    /* Handles the modal to edit a step*/

    render() {
        return (
            <Modal isOpen={this.props.editStepModalIsOpen}
                   onRequestClose={this.props.closeEditStepModal()}
                   contentLabel="Edit Step Modal">
                <form>
                    <div className="form-horizontal">
                        <h4 className="modal-text">Edit Step</h4>
                        <hr />
                        <div className="form-group">
                            <label className="col-md-12 modal-text"
                                   htmlFor="Title">
                                Title
                            </label>
                            <div className="modal-error">
                                {this.props.titleError}
                            </div>
                            <div className="col-md-12">
                                <input htmlFor="Title"
                                       id="Title"
                                       className="form-control modal-input"
                                       value={this.props.titleText}
                                       onChange={this.props.handleTitleChange()} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-12 modal-text"
                                   htmlFor="Description">
                                Description
                            </label>
                            <div className="modal-error">
                                {this.props.descError}
                            </div>
                            <div className="col-md-12">
                                <textarea rows="5"
                                          id="Description"
                                          htmlFor="Description"
                                          className="form-control modal-input"
                                          value={this.props.descriptionText}
                                          onChange={this.props.handleDescriptionChange()} />
                            </div>
                        </div>
                        <button className="btn btn-success modal-button" onClick={this.props.editStep()}>Edit Step</button>
                    </div>
                </form>
            </Modal>
        )
    }
}
export default EditStepModal;
