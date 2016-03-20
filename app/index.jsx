import React from "react";
import ReactDOM from "react-dom";
import Rx from "rxjs/Rx";
import immutablediff from "immutablediff";
import FlowNodeRecord from "./domain/FlowNodeRecord";
import Pipeline from "./components/Pipeline/";
import Typed from "typed-immutable";
import "rxjs/Rx.DOM";

const mountPoint = document.currentScript.parentNode;

let state = Typed.Record({
    nodes: Typed.List(FlowNodeRecord)
})();

const nodesResource = mountPoint.getAttribute("nodesResource");
const nodeResource = mountPoint.getAttribute("nodeResource");

ReactDOM.render((<div>Loading...</div>), mountPoint);

Rx.Observable
    .timer(0, 1000)
    .flatMap(() => Rx.Observable.ajax.getJSON(nodesResource))
    .subscribe(response => {
        const oldData = state;
        state = oldData.merge({ nodes: response });

        if (process.env.NODE_ENV != "production" && !state.equals(oldData)) {
            console.table(immutablediff(oldData, state).toJS());
        }

        ReactDOM.render(<Pipeline nodes={state.nodes} nodeResource={nodeResource}/>, mountPoint);
    });
