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
                        <g>
                            <path fill="#EF6C00" d="M25.4,22.6C25.4,22.6,25.4,22.6,25.4,22.6c0,0.1,0,0.1,0,0.1l0,0.1c0,0-0.1,0-0.2,0H15c0,0-0.1,0-0.1,0
				l0-0.1c0-0.4,0.2-0.7,0.6-0.7h5.7v-0.3c0-0.3,0.3-0.6,0.6-0.6h3c0.3,0,0.6,0.3,0.6,0.6V22.6z"/>
                        </g>
                        <g>
                            <path fill="#FF9800" d="M25.8,23.4l-0.4,6c0,0.4-0.3,0.7-0.7,0.7h-9.4c-0.4,0-0.7-0.3-0.7-0.7l-0.4-6c0-0.3,0.2-0.6,0.6-0.6
				c0,0,0.1,0,0.1,0h10.2c0.1,0,0.1,0,0.2,0C25.6,22.9,25.8,23.1,25.8,23.4z"/>
                        </g>
                    </g>
                    <g>
                        <path fill="#757575" d="M8,26.9V5.4h5.5v2.3H11v17h2.6v2.3H8z"/>
                    </g>
                </g>
            </svg>
        );
    } else {
        content = (
            <svg width={width} viewBox="0 0 32 32">
                <g>
                    <g>
                        <path fill="#EF6C00" d="M6.6,22.6C6.6,22.6,6.6,22.6,6.6,22.6c0,0.1,0,0.1,0,0.1l0,0.1c0,0,0.1,0,0.2,0H17c0,0,0.1,0,0.1,0l0-0.1
			c0-0.4-0.2-0.7-0.6-0.7h-5.7v-0.3c0-0.3-0.3-0.6-0.6-0.6h-3c-0.3,0-0.6,0.3-0.6,0.6V22.6z"/>
                    </g>
                    <g>
                        <path fill="#FF9800" d="M6.2,23.4l0.4,6c0,0.4,0.3,0.7,0.7,0.7h9.4c0.4,0,0.7-0.3,0.7-0.7l0.4-6c0-0.3-0.2-0.6-0.6-0.6
			c0,0-0.1,0-0.1,0H6.8c-0.1,0-0.1,0-0.2,0C6.4,22.9,6.2,23.1,6.2,23.4z"/>
                    </g>
                </g>
                <g>
                    <path fill="#757575" d="M18.5,26.9v-2.3H21v-17h-2.6V5.4H24v21.5H18.5z"/>
                </g>
            </svg>
        );
    }
    return (<div style={{ padding: 2 }}>{content}</div>);
};

