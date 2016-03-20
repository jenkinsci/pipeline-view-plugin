import * as React from "react";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        return false;
    }

    const width = 32;
    let content;
    if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepStartNode") {
        content = (
            <svg width={width} viewBox="0 0 48 48">
                <g>
                    <path fill="#FFA000" d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"/>
                </g>
                <g>
                    <path fill="#FFCA28" d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"/>
                </g>
            </svg>
        );
    } else {
        content = (
            <svg width={width} viewBox="0 0 48 48">
                <g>
                    <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/>
                </g>
                <g>
                    <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
                </g>
            </svg>
        );
    }
    return (<div style={{ padding: 5 }}>{content}</div>);
};

