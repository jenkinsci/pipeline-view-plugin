import * as React from "react";
import Graph from "./../Graph";
import graphlib from "graphlib";
import Stage from "./Stage/index";
import StepsFactory from "./steps";
import style from "./style.less";

export default class Pipeline extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !nextProps.nodes.equals(this.props.nodes);
    }

    render() {
        const { nodeResource, nodes } = this.props;
        console.log("Rendering...");

        const g = new graphlib.Graph({ compound: true });
        g.setDefaultEdgeLabel(() => ({}));

        g.setGraph({
            nodesep: 30,
            ranksep: 10,
            rankdir: "LR",
            // align: "UL"
        });

        let stages = {};

        let parent = null;

        for (let node of nodes) {
            let stageAction = node.getAction("org.jenkinsci.plugins.workflow.support.steps.StageStepExecution$StageActionImpl");

            if (stageAction) {
                parent = "stage_" + node.id;
                const stageName = stageAction.get("stageName");

                g.setNode(parent, { id: parent, label: stageName, isStage: true });
            } else if (parent != null && node["@class"] != "org.jenkinsci.plugins.workflow.graph.FlowEndNode") {
                g.setParent(node.id, parent);

                (stages[parent] = stages[parent] || []).push(node);
            }
            g.setNode(node.id, { id: node.id, flowNode: node });

            for (let parentId of node.parentIds) {
                g.setEdge(parentId, node.id);
            }
        }

        const nodeRenderer = (node, isParent) => {
            if (isParent) {
                return <Stage label={node.label}/>;
            }
            const flowNode = node.flowNode;
            const step = StepsFactory({ node: flowNode });

            if (!step) {
                return false;
            }

            const labelAction = flowNode.getAction("org.jenkinsci.plugins.workflow.actions.LabelAction");
            const label = labelAction ? labelAction.get("displayName") : flowNode.typeDisplayName;

            const errorAction = flowNode.getAction("org.jenkinsci.plugins.workflow.actions.ErrorAction");

            let link = `${nodeResource}/${node.id}`;

            if (flowNode.getAction("org.jenkinsci.plugins.workflow.support.actions.LogActionImpl")) {
                link += "/log/";
            }

            return (
                <a href={link} target="_blank" className={`${style.tooltip} ${style.node} ${errorAction ? style.erroredNode : ""}`} data-tooltip={label} tabIndex="-1">
                    <div>{step}</div>
                </a>
            );
        };

        return (
            <div className={style.pipeline}>
                <h2>Pipeline</h2>
                <Graph g={g} nodeRenderer={nodeRenderer}/>
            </div>
        );
    }
};

