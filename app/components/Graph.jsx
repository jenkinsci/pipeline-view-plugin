import React from "react";
import ReactDOM from "react-dom";
import dagre from "dagre";
import d3 from "d3-shape";

const lineInterpolation = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveBundle);

export default class Graph extends React.Component {

    isParent(g, nodeId) {
        const children = g.children(nodeId);
        return children && children.length > 0;
    }

    getNodeRef(nodeId) {
        return `node_${nodeId}`;
    }

    getEdgeRef(edgeId) {
        return `edge_{${edgeId.v}=>${edgeId.w}}`;
    }

    layout(g) {
        // Adjust node sizes
        for (let nodeId of g.nodes()) {
            const node = g.node(nodeId);

            const domNode = this.refs[this.getNodeRef(nodeId)];

            if (!domNode) {
                continue;
            }

            const { offsetWidth, offsetHeight } = domNode;

            node.width = Math.max(node.width || 0, offsetWidth || 0);
            node.height = Math.max(node.height || 0, offsetHeight || 0);
        }

        // Re-layout
        dagre.layout(g, { debugTiming: false });

        // Draw edges
        for (let edgeId of g.edges()) {
            const edge = g.edge(edgeId);

            let points = edge.points;
            if (!points || points.length < 2) {
                points = [{ x: 0, y: 0 }];
            }

            this.refs[this.getEdgeRef(edgeId)].setAttribute("d", this.lineInterpolation(points));
        }

        let maxWidth = 0;
        let maxHeight = 0;

        // fix position of nodes
        for (let nodeId of g.nodes()) {
            const domNode = this.refs[this.getNodeRef(nodeId)];

            if (!domNode) {
                continue;
            }

            const { x, y, width, height } = g.node(nodeId);

            // Kids, don't try this at home :)
            // We set it here because at the moment of render we don't know width/height of the nodes
            domNode.style.left = `${x - width * 0.5}px`;
            domNode.style.top = `${y - height * 0.5}px`;

            // Adjust width and height of parents
            if (this.isParent(g, nodeId)) {
                domNode.style.width = `${width}px`;
                domNode.style.height = `${height}px`;
            }

            maxWidth = Math.max(maxWidth, x + width * 0.5);
            maxHeight = Math.max(maxHeight, y + height * 0.5);
        }

        const graphDOM = ReactDOM.findDOMNode(this);

        graphDOM.style.width = `${maxWidth}px`;
        graphDOM.style.height = `${maxHeight}px`;
    }

    render() {
        const { g, nodeRenderer } = this.props;

        const elements = g.nodes()
            .sort((a, b) => this.isParent(g, a) ? -1 : this.isParent(g, b) ? 1 : 0) // stages should be under the nodes
            .map(nodeId => g.node(nodeId));

        // Request 1 frame because we want CSS to be applied to our nodes before we calculate width and height
        requestAnimationFrame(() => this.layout(g));

        return (
            <div style={{ position: "relative" }}>
                <svg width="100%" height="100%">
                    {g.edges().map(id => (
                        <path key={`${id.v}=>${id.w}`} ref={this.getEdgeRef(id)} stroke="#888" stroke-width="1" fill="none"/>
                    ))}
                </svg>
                {elements.map(node => {
                    const element = nodeRenderer(node, this.isParent(g, node.id));

                    if (!element) {
                        return false;
                    }

                    return (
                        <div key={node.id} ref={this.getNodeRef(node.id)} style={{ position: "absolute" }}>
                            {element}
                        </div>
                    );
                })}
            </div>
        );
    }
};
