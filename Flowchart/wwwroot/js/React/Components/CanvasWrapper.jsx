import Canvas from './Canvas';
import '../../../css/CanvasStyles.scss';
class CanvasWrapper extends React.Component {
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
    <CanvasWrapper/>,
    document.getElementById('flowchart-canvas')
);
