import * as React from "react";

var defaultStepsContext = require.context("./", true, /\/index\.(jsx|svg)+$/);

// TODO populate stepFactories from other places (aka pluggable system)
const stepFactories = {};

var keys = defaultStepsContext.keys();

var contexts = keys.reduce((acc, key) => {

    var lastSlash = key.lastIndexOf("/");
    const stepClass = key.substring(2, lastSlash);

    if (stepClass == "index.jsx" || stepClass == "/") {
        return acc;
    }

    (acc[stepClass] = (acc[stepClass] || [])).push(key);

    return acc;
}, {});

for (const stepClass of Object.keys(contexts)) {

    const extensions = contexts[stepClass];

    let component;

    var jsxContext = extensions.find(context => context.endsWith(".jsx"));
    if (jsxContext) {
        component = defaultStepsContext(jsxContext).default;
    } else {
        const svgContext = extensions.find(context => context.endsWith(".svg"));
        if (svgContext) {
            component = () => (
                <svg width="32px" height="32px">
                    <use xlinkHref={defaultStepsContext(svgContext)}/>
                </svg>
            );
        }
    }

    if (component) {
        stepFactories[stepClass] = component;
    } else {
        window.console.warn(`Unknown file extensions for ${stepClass}: ${extensions}`);
    }
}

export default function({ node }) {
    const descriptor = (node.descriptor || {}).id || undefined;

    let stepFactoryName;
    if (descriptor in stepFactories) {
        stepFactoryName = descriptor;
    } else {
        stepFactoryName = "DefaultStep";
    }

    return (stepFactories[stepFactoryName])({ node });
};
