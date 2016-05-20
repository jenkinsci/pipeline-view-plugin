import * as React from "react";
import iconStart from "./start.svg";
import iconEnd from "./end.svg";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        return false;
    }

    let content;
    if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepStartNode") {
        content = iconStart;
    } else {
        content = iconEnd;
    }

    return (
        <svg width="32px" height="32px">
            <use xlinkHref={content}/>
        </svg>
    );
};

