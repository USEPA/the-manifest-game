# The Manifest Game Docs

## Table of Contents

1. [Introduction](#introduction)
2. [specification](#specification)
3. [Nomenclature](#nomenclature)
4. [Implementation Notes](#implementation-notes)
5. [Deployment](#deployment)
6. [Future Work](#future-work)

## Introduction

The purpose of this project is to create an interactive decision tree that will help people understand
[e-Manifest](https://epa.gov/e-manifest) and the electronic hazardous waste manifesting process by tailoring help to the
user's specific use case. It's intended to be a publicly available tool to assist (i.e., no sensitive information is
displayed or authentication is required).

## Specification

The decision tree is a series of questions that will guide the user to the appropriate help content, or directly answer
the user's questions directly in the graph.

The decision tree should meet the following requirements for a minimum viable product (MVP):

1. The decision tree is be interactive, allowing the user to navigate the tree by clicking on the appropriate
   nodes of the tree or buttons.
2. The decision tree is be able to be embedded in a web page.
3. The tree should walk the user through the process of electronically manifesting hazardous waste.

## Nomenclature

The following terms are used throughout the documentation and code:

1. **Node**: A node is a vertex in the decision tree. We have multiple types of nodes:
   such as "Yes/No" nodes (`BoolNode`) and default nodes (`DefaultNode`).
2. **Edge**: An edge is a connection between two nodes. The edge is directed from the parent node to the child node.
3. **Decision Tree**: The decision tree is the entire graph of nodes and edges. The decision tree must be a directed
   acyclic graph (DAG) to prevent infinite loops. In the future, we plan on allowing users to create the decision tree
   with a config file (again, there must be no cycles in the graph).
4. **Children**: The children of a node are the vertices that are **_directly_** connected to the parent node by a
   direct edge such that in the topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the parent
   of `v`, `u` comes before `v`. (you will see this term in the code many times, see "Descendant")
5. **Descendant** (or **Descendants**): The descendants of a node are the vertices that are connected to the parent node
   by a path of edges such that in the topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the
   parent of `v`, `u` comes before `v`. (you will see this term in the code many times)

## Implementation Notes

This project is implemented using [React](https://reactjs.org/) and the [react-flow](https://reactflow.dev/) library.
which made prototyping possible in a short amount of time.

A dependency that came with the react-flow library is [zustand](https://github.com/pmndrs/zustand), a state management
library that is gaining popularity in the React community. We use this library to manage the state of the decision tree.
It does not cost us on bundle size as (A) it already was included as a dependency of react-flow and (B) it is a very
small library. We avoid using the state hooks directly in the UI and wrap that functionality in a custom hooks.

We, essentially, keep two copies of the decision tree in memory: one as an array of nodes (used by the react-flow
library) and
one as a map (really it's a typescript Record at the moment) which we call the tree. We operate on the tree and then
convert it to an array when we need to display it. Currently, this works, but we may need to rethink this approach.

## Deployment

The development server can be started using the npm run dev command. This will start a server on port 3000 (by default).
The project currently uses [vite](https://vitejs.dev/) as the development server, bundler, and build tool.

This project config files also include a Dockerfile and a docker-compose file, both of which are fairly straightforward.
Both will deploy the project on port 3000 behind an [Nginx](https://www.nginx.com/) reverse proxy. The docker-compose
just makes to easier to build, run, and expose the project on port 3000.

## Future Work

1. It should be possible to link to a specific node in the decision tree so that the tree starts at that node open upon
   visiting the page.
2. Currently, we rely on `useEffects` to keep the tree and array in sync. This is a 'bad smell' and we should (I
   believe) move that logic into the global state management store.
3. A new custom node type for multiple choice questions (e.g., what type of site are you? A generator, a TSDF, or a
   transporter).
4. Add a dropdown menu that will allow users to load multiple decision trees for different use cases.
