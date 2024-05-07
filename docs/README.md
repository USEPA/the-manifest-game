# The Manifest Game Docs

## Table of Contents

1. [Introduction](#introduction)
2. [specification](#specification)
3. [Nomenclature](#nomenclature)
4. [Implementation Notes](#implementation-notes)
5. [Configuration](#configuration)

- [Node Properties](#shared-node-properties)
- [DefaultNode](#defaultnode)
- [BoolNode](#boolnode)
- [Help Content](#help-content)
- [Environment Variables](#environment-variables)

6. [Deployment](#deployment)
7. [Future Work](#future-work)

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
6. **Parent**: The parent of a node is the vertex that is connected to the child node by a direct edge such that in the
   topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the parent of `v`, `u` comes
   before `v`.
   (you will see this term in the code many times)
7. **Sibling**: The siblings of a node are the vertices that are connected to the same parent node as the child node.
   Siblings have the same "rank" in the DAG.
8. **_Nibling_**: The niblings of a node are the descendants of the node's siblings (those that reside at the same level
   or rank in the
   DAG)

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

## Configuration

The decision tree is read from a configuration file. A configuration file is a JSON file that contains all nodes in the
tree, and any accompanying metadata. The configuration file is fetched from the server, read, and parsed at runtime to
build the decision tree. These are stored in the `public/` directory, in particular the `public/default.json` file will
be
loaded by default (see future work).

The configuration should reflect the following example:

```json
{
  "nodes": [
    {
      "id": "root",
      "type": "BoolNode",
      "data": {
        "label": "Are you registered?",
        "yesId": "doYouHaveSiteId",
        "noId": "goRegister",
        "help": "welcome.html"
      }
    },
    {
      "id": "goRegister",
      "data": {
        "label": "Time to Register in RCRAInfo!",
        "children": [
          "test1",
          "test2"
        ],
        "help": "register.json"
      }
    }
  ]
}
```

The nodes array contains all the nodes, the edges are built at runtime. There are different types of nodes, each type
requires a different configuration.

### Shared Node Properties

- **id**: A unique **_identifier_** for the node. It must be unique across all nodes in the tree. We recommend using a
  short descriptive name (e.g., `goRegister`).
- **type**: The optional type of the node. If no value specified, a default node will be created. The type determines
  the behavior of the node. The type is a string that corresponds to the name of the node class (e.g., `BoolNode`).
- **data**: An object that contains the node's metadata. The metadata is different for each node type.
- **data.label**: The text that will be displayed on the node. This is the question or statement that the node
  represents.
- **data.help**: A boolean value that determines if the node has help content. If true, the node will display a help
  icon
  that will display help content when clicked.
- **data.help**: A boolean value that determines if the node has help content. If true, the decision tree expects to be
  able to find a JSON file in `public/help/` with the same name as the node id. A question mark icon will be displayed
  on node if true. See [Help Content](#help-content) for more information.

### DefaultNode

- **data.children**: An array of children node ids. On click, the default node will display/hide these nodes.

```json
{
  "id": "goRegister",
  "data": {
    "label": "You have options",
    "children": [
      "option1",
      "option2"
    ]
  }
}
```

### BoolNode

- **data.yesId**: The id of the node that will be displayed if the user selects "yes".
- **data.noId**: The id of the node that will be displayed if the user selects "no".

```json
{
  "id": "likeToPlatAGame",
  "type": "BoolNode",
  "data": {
    "label": "Would you like to play a game?",
    "yesId": "sureWhyNot",
    "noId": "noThankYou",
    "help": true
  }
}
```

### Help Content

Nodes can optionally have help content, which can be useful for providing additional information to the user when the
node merits further explanation. The help content is stored in the `public/help/` directory. The JSON representation of
the decision tree should include the file name (e.g., `help.html`) in the `"help"` field of the node's data object.

Currently, we support text and HTML based content.

JSON encoded content should follow the below schema. See [future work](#future-work).

```json
{
  "type": "text",
  "content": "Welcome to the Manifest Game!\n\n This decision tree will help you..."
}
```

### Environment Variables

A list of environment variables that can be used to configure the application can be found in the `/src/.env.d.ts` file.
These variables are passed at build time, see the [Vite documentation](https://vitejs.dev/guide/env-and-mode.html) for
further details.

A couple of things that can be configured are the app title (default: 'The Manifest Game') and the issue
tracker URL (default: 'mailto:eManifest@epa.gov').

## Deployment

The development server can be started using the npm run dev command. This will start a server on port 3000 (by default).
The project currently uses [vite](https://vitejs.dev/) as the development server, bundler, and build tool.

The project is a static site, any method of deploying static files will work (e.g., AWS S3, raspberry pi in the
basement, etc.).

This project config files also include a Dockerfile and a docker-compose file, both of which are fairly straightforward.
Both will deploy the project on port 3000 behind [Nginx](https://www.nginx.com/). The docker-compose
just makes to easier to build, run, and expose the project on port 3000 locally if you don't have a supported version of
node installed.

```shell
docker compose up
```

## Future Work

1. It should be possible to link to a specific node in the decision tree so that the tree starts at that node open upon
   visiting the page.
2. A new custom node type for multiple choice questions (e.g., what type of site are you? A generator, a TSDF, or a
   transporter).
3. Allow EPA to create multiple tree for users.
4. Markup help text. Currently, we only support text based help content, stored in a JSON encoded file. Being able to
   provide more complex help content could make the tool more useful as it would allow linking to other resources.
