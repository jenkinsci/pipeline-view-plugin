import * as React from "react";
import Circle from "./support/Circle";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepEndNode") {
            return false;
        }

        const parallelLabelAction = node.getAction("org.jenkinsci.plugins.workflow.cps.steps.ParallelStepExecution$ParallelLabelAction");

        return (<div style={{ padding: 5 }}>{parallelLabelAction.get("threadName")}</div>);
    }

    return Circle();
};
