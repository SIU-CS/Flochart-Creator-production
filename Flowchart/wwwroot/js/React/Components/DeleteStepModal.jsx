import Modal from 'react-modal';
class DeleteStepModal extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.deleteStepModalIsOpen}
                   onRequestClose={this.props.closeDeleteStepModal()}
                   contentLabel="Delete Step Modal">
                <h4 className="modal-text">
                    Really Delete Step?
                </h4>
                <hr/>
                <button onClick={this.props.deleteStep()}
                        className="btn btn-warning delete-button">
                    Delete Step
                </button>
                <button onClick={this.props.closeDeleteStepModal()}
                        className="btn btn-default delete-cancel-button">
                    Cancel
                </button>
            </Modal>
        )
    }
}
export default DeleteStepModal;
