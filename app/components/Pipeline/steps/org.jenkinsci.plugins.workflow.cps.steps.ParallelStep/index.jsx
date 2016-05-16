import * as React from "react";
import icon from "./index.svg";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepEndNode") {
            return false;
        }

        const parallelLabelAction = node.getAction("org.jenkinsci.plugins.workflow.cps.steps.ParallelStepExecution$ParallelLabelAction");

        return (<div style={{ padding: 5 }}>{parallelLabelAction.get("threadName")}</div>);
    }

    return (
        <svg width="32px" height="32px">
            <use xlinkHref={icon}/>
        </svg>
    );
};
