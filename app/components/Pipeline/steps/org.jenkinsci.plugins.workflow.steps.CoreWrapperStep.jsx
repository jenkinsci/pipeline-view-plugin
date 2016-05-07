import * as React from "react";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        return false;
    }

    const width = 32;
    let content;
    if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepStartNode") {
        content = (
            <svg width={width} viewBox="0 0 32 32">
                <g>
                    <g>
                        <path fill="#4CAF50" d="M26.4,16.8h-4.9L17,21.2v6.9c0,0.5,0.4,1,1,1h8.4c0.5,0,1-0.4,1-1V17.8C27.4,17.2,26.9,16.8,26.4,16.8z"/>
                    </g>
                    <g>
                        <path fill="#A5D6A7" d="M20.5,21.2c0.5,0,1-0.4,1-1v-3.4L17,21.2H20.5z"/>
                    </g>
                </g>
                <g>
                    <path fill="#757575" d="M9.3,26.9V5.4h5.5v2.3h-2.6v17h2.6v2.3H9.3z"/>
                </g>
            </svg>

    );
    } else {
        content = (
            <svg width={width} viewBox="0 0 32 32">
                <g>
                    <g>
                        <path fill="#4CAF50" d="M15.4,16.8h-4.9l-4.4,4.4v6.9c0,0.5,0.4,1,1,1h8.4c0.5,0,1-0.4,1-1V17.8C16.4,17.2,16,16.8,15.4,16.8z"/>
                    </g>
                    <g>
                        <path fill="#A5D6A7" d="M9.5,21.2c0.5,0,1-0.4,1-1v-3.4l-4.4,4.4H9.5z"/>
                    </g>
                </g>
                <g>
                    <path fill="#757575" d="M18.6,26.9v-2.3h2.6v-17h-2.6V5.4h5.5v21.5H18.6z"/>
                </g>
            </svg>

        );
    }
    return (<div style={{ padding: 5 }}>{content}</div>);
};

