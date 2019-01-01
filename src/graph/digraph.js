import React from 'react';
import ConnectionView from '../component/connection-view';

export default class Digraph {
    edges = [];

    addNode(node) {
        if(this.edges.includes(node)) {
            throw Error('Duplicate node');
        }
        this.edges.push({node, edges: []});
    }

    addEdge(edge) {
        const source = edge.source;
        const destination = edge.destination;
        const sourceNode = this.edges.find(
            n => n.node.id === source.id);
        const destinationNode = this.edges.find(
            n => n.node.id === destination.id);
        if(!(sourceNode && destinationNode)) {
            throw Error('Node not in graph');
        }

        sourceNode.edges.push(destination);
    }

    childrenOf(node) {
        return this.edges[node];
    }

    hasNode(node) {
        return this.edges.includes(node);
    }

    getNode(name) {
        for(let n of this.edges) {
            if(n.node.id === name) {
                return n.node;
            }
        }

        throw Error('Name not found: ' + name);
    }

    display() {
        return this.edges.map(source =>
            source.edges.map(
                destination =>
                    <ConnectionView
                        key={source.node.id + '->' + destination.id}
                        source={source.node}
                        destination={destination}
                    />,
            ),
        );
    }

}