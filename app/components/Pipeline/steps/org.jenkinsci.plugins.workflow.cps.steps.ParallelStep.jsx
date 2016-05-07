import * as React from "react";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepEndNode") {
            return false;
        }

        const parallelLabelAction = node.getAction("org.jenkinsci.plugins.workflow.cps.steps.ParallelStepExecution$ParallelLabelAction");

        return (<div style={{ padding: 5 }}>{parallelLabelAction.get("threadName")}</div>);
    }

    return (
        <svg width="32px" viewBox="0 0 32 32">
            <g>
                <g>
                    <path fill="#607D8B" d="M16,30.6L1.3,16L16,1.4L30.7,16L16,30.6z M4.2,16L16,27.8L27.8,16L16,4.2L4.2,16z"/>
                </g>
                <g>
                    <rect x="9.6" y="15" fill="#607D8B" width="12.8" height="2"/>
                </g>
                <g>
                    <rect x="15" y="9.6" fill="#607D8B" width="2" height="12.8"/>
                </g>
            </g>
        </svg>
    );
};
