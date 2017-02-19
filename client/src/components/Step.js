import React, { Component } from 'react';

class Step extends Component {
    render() {
        return (
            <div className="step-container">
                <p className="step-title">
                    {this.props.title}
                </p>
                <p className="step-description">
                    {this.props.description}
                </p>
            </div>
        );
    }
}

export default Step;
