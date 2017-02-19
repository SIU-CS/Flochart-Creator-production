import React, { Component } from 'react';
import Step from './Step';
import '../assets/index.scss';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Step title="My new step"
                      description="I want to show you my new step" >
                </Step>
            </div>
        );
    }
}

export default App;
