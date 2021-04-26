import React, {Component} from "react";
import {CPromise, CanceledError, ReactComponent, E_REASON_UNMOUNTED, async, listen, cancel, progress, canceled} from "../../lib/c-promise";
import cpAxios from "cp-axios";

@ReactComponent
class TestComponent extends Component{
    state = {
        text: ""
    };

    *componentDidMount(scope) {
        console.log('mount', scope);
        scope.onCancel((err)=> console.log(`Cancel: ${err}`));
        yield CPromise.delay(3000);
    }

    @listen
    *fetch(){
        this.setState({text: "fetching..."});
        try {
            const response = yield cpAxios(this.props.url).timeout(this.props.timeout);
            this.setState({text: JSON.stringify(response.data, null, 2)});
        } catch (err) {
            CanceledError.rethrow(err, E_REASON_UNMOUNTED);
            this.setState({text:err.toString()});
        }
    }

    *componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        return <div className="component">
            <div className="caption">useAsyncEffect demo:</div>
            <div>{this.state.text}</div>
            <button
              className="btn btn-success"
              type="submit"
              onClick={() => this.fetch(Math.round(Math.random() * 200))}
            >
                Fetch random character info
            </button>
            <button className="btn btn-warning" onClick={()=>cancel.call(this, 'oops!')}>
                Cancel request
            </button>
        </div>
    }
}

export default TestComponent;

