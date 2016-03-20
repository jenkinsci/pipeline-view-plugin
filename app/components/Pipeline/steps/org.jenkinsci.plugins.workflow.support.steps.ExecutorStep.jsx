import * as React from "react";

export default function({ node }) {
    if (node.getAction("org.jenkinsci.plugins.workflow.actions.BodyInvocationAction") != null) {
        return false;
    }
    if (node["@class"] == "org.jenkinsci.plugins.workflow.cps.nodes.StepEndNode") {
        return false;
    }

    return (
        <svg width="32px" viewBox="0 0 24 24">
            <path fill="#3e3e3e" d="M2 0v15h20v-15h-20zm18 13h-16v-11h16v11zm-6 3l1.599 2h-7.198l1.599-2h4zm-12 3v5h20v-5h-20zm9.5 3.1c-.332 0-.6-.269-.6-.6s.269-.6.6-.6.6.269.6.6-.268.6-.6.6zm8.5-.1h-6v-1h6v1z"/>
        </svg>
    );
};

