import AddStepButton from './AddStepButton';
import Modal from 'react-modal';
class Canvas extends React.Component {
    constructor() {
        super();
        this.state = {
            stepList: [],
            body: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidMount() {
        if (this.props.stepList &&
            this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else {
            this.setState({
                body: <AddStepButton />
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

    addNewStep() {
        alert("hi");
    }

    render() {
        return (
            <div className="flowchart-canvas">
                <AddStepButton handleClick={() => { this.openModal() }} />
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
                                    <input htmlFor="Title" id="Title" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="Description">Description</label>
                                <div className="col-md-10">
                                    <textarea rows="5" id="Description" htmlFor="Description" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
ReactDOM.render(
    <Canvas />,
    document.getElementById('flowchart-canvas')
);



