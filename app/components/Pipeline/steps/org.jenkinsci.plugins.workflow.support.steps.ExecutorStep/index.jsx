import * as React from "react";
import iconStart from "./start.svg";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        return false;
    }
    if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepEndNode") {
        return false;
    }

    return (
        <svg width="32px" height="32px">
            <use xlinkHref={iconStart}/>
        </svg>
    );
};

