/* Flowchart nav sits right beneath the real nav bar and has options for
   adding a top-level step and saving the flowchart*/

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
                {/* The ugly hack of the program lies here. We couldn't get C# to
                    regognize plain POST data, so we had to put it into a form, and
                    make the save button a submit button for the form. For whatever reason,
                    C# can recognize POSTed form data just fine */}
                <form action={url} method="post">
                    <input name="id" type="hidden" value={id}/>
                    {/* That's right - a hidden input with a bunch of JSON in it
                        Maybe we should have made it a textarea... */}
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
