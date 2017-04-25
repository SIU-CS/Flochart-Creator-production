import Canvas from './Canvas';
import '../../../css/CanvasStyles.scss';

class CanvasWrapper extends React.Component {
    /* Wraps the canvas, and acts as the entry point for react*/

    render() {
        return (
            <div className="flowchart-canvas-wrapper">
                <Canvas />
            </div>
        );
    }
}

export default CanvasWrapper;

ReactDOM.render(
    /* Render the canvas wrapper in #flowchart-canvas in Views/Flowchart/Edit*/
    <CanvasWrapper/>,
    document.getElementById('flowchart-canvas')
);
