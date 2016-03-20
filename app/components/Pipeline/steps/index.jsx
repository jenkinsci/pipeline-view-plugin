import * as React from "react";

var defaultStepsContext = require.context("./", false, /\.jsx$/);

// TODO populate stepFactories from other places (aka pluggable system)
const stepFactories = {};

for (const key of defaultStepsContext.keys()) {
    const stepClass = key.substring(2, key.length - ".jsx".length);

    if (stepClass == "index") {
        continue;
    }

    stepFactories[stepClass] = defaultStepsContext(key).default;
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
