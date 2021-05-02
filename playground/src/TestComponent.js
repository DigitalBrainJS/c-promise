import React, {Component} from "react";
import {CPromise, CanceledError, ReactComponent, E_REASON_UNMOUNTED, async, listen, cancel, progress, canceled} from "../../lib/c-promise";
import cpAxios from "cp-axios";

class ProtoComponent extends Component{
    onClick2(){
        console.log('ProtoComponent::click2', this);
    }
}

@ReactComponent
class TestComponent extends ProtoComponent{
    state = {
        text: ""
    };

    *componentDidMount(scope) {
        console.log('mount', scope);
        scope.onCancel((err)=> console.log(`Cancel: ${err}`));
        yield CPromise.delay(3000);
    }

    onClick2(){
        console.log('TestComponent::click2', this);
        super.onClick2();
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

    render() {
        return <div className="component">
            <div className="caption">useAsyncEffect demo:</div>
            <div>{this.state.text}</div>
            <button
              className="btn btn-success"
              onClick={this.fetch}
            >
                Fetch data
            </button>
            <button className="btn btn-warning" onClick={()=>cancel.call(this, 'oops!')}>
                Cancel request
            </button>
            <button className="btn btn-info"  onClick={this.onClick2}>Listener binding test</button>
        </div>
    }
}

export default TestComponent;

