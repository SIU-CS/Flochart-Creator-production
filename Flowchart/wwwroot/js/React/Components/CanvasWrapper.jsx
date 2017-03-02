import '../../../css/CanvasStyles.scss';
class CanvasWrapper extends React.Component {
    render() {
        return (
            <div className="flowchart-canvas">
                {this.props.children}
            </div>
        )

    }
}