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
                    <path fill="#757575" d="M6.3,26.9V5.4h5.5v2.3H9.3v17h2.6v2.3H6.3z"/>
                </g>
                <g>
                    <path d="M16.4,25.7h-2V27h2.2v1h-3.4v-5.4h3.3v1h-2.1v1.1h2V25.7z"/>
                    <path d="M17.5,28v-5.4h1.4l1.1,2c0.3,0.6,0.6,1.2,0.9,1.8h0c-0.1-0.7-0.1-1.4-0.1-2.2v-1.6h1.1V28h-1.3l-1.2-2.1
		c-0.3-0.6-0.7-1.3-0.9-1.9l0,0c0,0.7,0,1.5,0,2.4V28H17.5z"/>
                    <path
                        d="M24.3,28l-1.7-5.4h1.3l0.7,2.3c0.2,0.6,0.4,1.3,0.5,1.9h0c0.1-0.6,0.3-1.3,0.5-1.9l0.7-2.3h1.3L25.7,28H24.3z"/>
                </g>
            </svg>

        );
    } else {
        content = (
            <svg width={width} viewBox="0 0 32 32">
                <g>
                    <g>
                        <path fill="#757575" d="M20.2,26.9v-2.3h2.6v-17h-2.6V5.4h5.5v21.5H20.2z"/>
                    </g>
                    <g>
                        <path d="M8.1,25.7h-2V27h2.2v1H4.9v-5.4h3.3v1H6.1v1.1h2V25.7z"/>
                        <path d="M9.2,28v-5.4h1.4l1.1,2c0.3,0.6,0.6,1.2,0.9,1.8h0c-0.1-0.7-0.1-1.4-0.1-2.2v-1.6h1.1V28h-1.3l-1.2-2.1
			c-0.3-0.6-0.7-1.3-0.9-1.9l0,0c0,0.7,0,1.5,0,2.4V28H9.2z"/>
                        <path
                            d="M16,28l-1.7-5.4h1.3l0.7,2.3c0.2,0.6,0.4,1.3,0.5,1.9h0c0.1-0.6,0.3-1.3,0.5-1.9l0.7-2.3h1.3L17.4,28H16z"/>
                    </g>
                </g>
            </svg>

        );
    }
    return (<div style={{ padding: 5 }}>{content}</div>);
};

