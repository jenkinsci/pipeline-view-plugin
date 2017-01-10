import React from "react";
import ReactDOM from "react-dom";
import Rx from "rxjs/Rx";
// Make RxConnect happy.
// TODO RxConnect with RxJS 5 support
Rx.Observable.isObservable = obj => obj && typeof obj.subscribe === "function";
import immutablediff from "immutablediff";
import FlowNodeRecord from "./domain/FlowNodeRecord";
import Pipeline from "./components/Pipeline/";
import Typed from "typed-immutable";
import { rxConnect } from "rx-connect";

const mountPoint = document.currentScript.parentNode;

const nodesResource = mountPoint.getAttribute("nodesResource");
const nodeResource = mountPoint.getAttribute("nodeResource");

@rxConnect(
    Rx.Observable
        .timer(0, 1000)
        .flatMap(() => Rx.Observable.ajax.getJSON(nodesResource).catch(() => Rx.Observable.empty()))
        .scan((oldData, nodes) => {
            const state = oldData.merge({ nodes });

            if (process.env.NODE_ENV != "production" && !state.equals(oldData)) {
                console.table(immutablediff(oldData, state).toJS());
            }
            return state;
        }, Typed.Record({ nodes: Typed.List(FlowNodeRecord) })())
        .distinctUntilChanged()
        .map(({ nodes }) => ({ nodes }))
)
class App extends React.PureComponent {
    render() {
        const { nodes } = this.props;

        return nodes ? (
            <Pipeline nodes={nodes} nodeResource={nodeResource}/>
        ) : (
            <div>Loading...</div>
        );
    }
}

ReactDOM.render(<App />, mountPoint);
