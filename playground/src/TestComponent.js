import React, { Component } from "react";
import {
    CPromise,
    CanceledError,
    ReactComponent,
    E_REASON_UNMOUNTED,
    listen,
    async,
    cancel
} from "c-promise2";
import { Spinner } from "react-bootstrap";
import cpAxios from "cp-axios";

@ReactComponent
class TestComponent extends Component {
    state = {
        text: "idle",
        loading: false,
        loader: false
    };

    *componentDidMount() {
        console.log("mounted");
        yield this.fetch();
    }

    * fetch() {
        this.setState({text: "fetching...", loading: true});
        yield CPromise.race([
            this.showLoader(1000, 'loader'),
            CPromise.run(function* () {
                try {
                    const response = yield cpAxios(this.props.url).timeout(
                      this.props.timeout
                    );
                    this.setState({
                        text: JSON.stringify(response.data, null, 2),
                        loading: false
                    });
                } catch (err) {
                    CanceledError.rethrow(err, E_REASON_UNMOUNTED);
                    this.setState({text: err.toString(), loading: false});
                }
            }, {context: this})
        ])
    }

    @async({ scopeArg: true })
    *showLoader(scope, delay= 1000, stateVar) {
        yield CPromise.delay(delay);
        this.setState({ [stateVar]: true });
        scope.onDone(()=>{
            this.setState({ [stateVar]: false });
        })
        scope.pause();
    }

    render() {
        return (
          <div className="component">
              <div className="caption">CPromise decorators demo:</div>
              <div>
                  {this.state.loader ? (
                    <Spinner animation="border" variant="primary" />
                  ) : null}
                  {this.state.text}
              </div>
              <button className="btn btn-success" onClick={() => this.fetch()}>
                  Fetch data
              </button>
              <button
                className="btn btn-warning"
                onClick={() => cancel.call(this, "oops!")}
              >
                  Cancel request
              </button>
          </div>
        );
    }
}

console.log("componentDidMount", TestComponent.prototype.componentDidMount);

export default TestComponent;
