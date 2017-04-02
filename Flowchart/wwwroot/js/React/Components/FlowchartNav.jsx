import AddStepButton from './AddStepButton';

class FlowchartNav extends React.Component {
    render() {
        let url = window.location.href; // get the url for the id
        url = url.split("/"); // make an array, splitting url on '/'
        url = url[url.length-1]; // get just the id in the url
        let id = url;
        url = "/Flowchart/Edit/"+id;
        return (
            <div className="flowchart-nav">
                <form action={url} method="post">
                    <input name="id" type="hidden" value={id}/>
                    <input name="Steps" type="hidden" value={this.props.stepList}/>
                    <button id="save-flowchart-button"
                            className="btn btn-success"
                            type="submit">
                        Save <br/>Flowchart
                </button>
                </form>
                <AddStepButton handleClick={this.props.openAddStepModal()} />
            </div>
        )
    }
}
export default FlowchartNav;
