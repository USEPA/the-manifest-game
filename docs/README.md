# The Manifest Game Docs

## Table of Contents

1. [Introduction](#introduction)
2. [specification](#requirements)
3. [Nomenclature](#nomenclature)
4. [Implementation Notes](#implementation-notes)
5. [The Manifest Game Docs](#the-manifest-game-docs)
    - [Implementation Notes](#implementation-notes)
    - [Configuration](#configuration)
        - [Shared Node Properties](#shared-node-properties)
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

## Requirements

The decision tree is a series of questions that will guide the user to the appropriate help content, or answer
the user's questions directly in the graph.

The decision tree (hereafter referred to as "the tree") should meet the following requirements for a minimum viable
product (MVP):

1. The tree MUST be interactive, allowing the user to navigate the tree and show information relevant to them while
   hiding information that does not directly answer their inquiry.
    - Leaf nodes SHOULD, where appropriate, link to more information on [EPA.gov/e-manifest](https://epa.gov/e-manifest)
2. The tree MUST be accessible through a modern web browser.
3. The tree MUST be configurable through a via text file using a common format (e.g., JSON, yaml).
4. The tree SHOULD be deployable as a static site.
5. The tree COULD allow users to share decision trees deep linked to a specific node.
6. The tree COULD support showing help content in a modal window where information cannot fit onto a tree node.
7. The tree SHOULD support showing multiple decision tree on separate pages of the site.
8. The tree COULD support loops in the decision tree to indicate that the user should repeat these steps until a certain
   criteria is met.

## Nomenclature

Before reading the docs or code, it is helpful to be familiar
with [Directed Acyclic Graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

The following terms are used throughout the source:

1. **Directed Acyclic Graph** a graph that consist of vertices and edges, with each edge directed
   from one vertex to another, such that following those directions will never form a closed loop.
2. **Node**: A node is the implementation of a vertex in the decision tree and represents a choice.
   We have multiple types of nodes: such as "Yes/No" nodes (`BoolNode`) and default nodes (`DefaultNode`).
3. **Edge**: An edge is a connection between two nodes. The edge is directed from the parent node to the child node.
4. **Decision Tree**: The decision tree is the graph of choices. The decision tree must be a directed
   acyclic graph (DAG) to prevent infinite loops.
5. **Children**: The children of a node are the nodes that are **_directly_** connected to the parent node by an
   edge such that in the topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the parent
   of `v`, `u` comes before `v`. (also see "Descendant")
6. **Descendant**: The nodes that are connected to the parent node
   by a path of edges such that in the topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the
   parent of `v`, `u` comes before `v`.
7. **Parent**: The parent of a node is the vertex that is connected to the child node by a direct edge such that in the
   topological order `f(u, v)` of the DAG, for every edge `(u, v)`, where `u` is the parent of `v`, `u` comes
   before `v`.
8. **Sibling**: The siblings of a node are the vertices that are connected to the same parent node as the child node.
   Siblings have the same "rank" in the DAG.
9. **_Nibling_**: The niblings of a node are the descendants of the node's siblings (those that reside at the same level
   or rank in the DAG)

## Implementation Notes

This project is implemented using the [React](https://reactjs.org/) library and ecosystem
which made prototyping possible in a short amount of time.

Another dependency of note is [zustand](https://github.com/pmndrs/zustand), a popular state management
library. We use this library to manage the global state of the decision tree to make sure that the logic for updating to
tree was centralized and the tree remains in a acceptable state on change.

## Configuration

The decision tree is read from a JSON configuration file that contains all choices in the
tree, and any accompanying metadata. The decision tree config files are stored in the `public/` directory,
which is included in the bundled artifact at build time. Configs are fetched from the server, read, and parsed at
runtime to
build the decision tree. In particular the `public/default.json` tree config file is loaded by default
when the user first visits the page.

The decision tree config should follow a schema illustrated by the below example:

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
                "children": [],
                "help": "register.json"
            }
        }
    ]
}
```

The config files contains an array of nodes, the edges are built at runtime.
There are different types of nodes which vary in their expected schema.

### Shared Node Properties

- **id**: A unique **_identifier_** for the node. It must be unique across all nodes in the tree. We recommend using a
  short descriptive name (e.g., `goRegister`).
- **type**: The optional type of the node. If no value specified, a default node will be created. The type determines
  the behavior of the node. The type is a string that corresponds to the name of the node class (e.g., `BoolNode`).
    - Possible values: `"BoolNode"`, `"Default"`, or left blank.
- **data**: An object that contains the node's metadata. including the children of a node.
- **data.label**: The text that will be displayed on the node. This is the question or statement that the node
  represents.
- **data.help**: A string value corresponding to a JSON or HTML file in the `public/help/` directory.
  If present, the node will display a question mark icon that, when clicked,
  will fetch and render the JSON/HTML file (see [help content](#help-content)).

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
    "id": "wouldULikeToPlayAGame",
    "type": "BoolNode",
    "data": {
        "label": "Would you like to play a game?",
        "yesId": "sureWhyNot",
        "noId": "noThankYou",
        "help": "game-instructions.html"
    }
}
```

### Help Content

Some choices have additional information to accompany the node label.
The help content is stored in the `public/help/` directory and can either be a JSON or HTML file.

JSON encoded content should follow the below schema.

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

For example, things that can be configured are the app title (default: 'The Manifest Game') and the issue
tracker URL (default: 'mailto:eManifest@epa.gov').

## Deployment

The development server can be started using the npm run dev command.

The project is a static site, any method of deploying static files will work (e.g., AWS S3, raspberry pi in the
basement, etc.).

This project also include a Dockerfile and a docker-compose file, both of which are fairly straightforward.
The containerized project exposes the site on port 3000 behind [Nginx](https://www.nginx.com/).
The docker-compose just makes it easier to locally develop/build/run the site.

```shell
docker compose up
```

## Future Work

- [x] It should be possible to link to a specific node in the decision tree so that the tree starts at that node open
  upon visiting the page.
- [ ] A node type for multiple choice questions (e.g., what type of site are you? A generator, a TSDF, or a
  transporter).
- [ ] Allow EPA to configure multiple trees/subtrees.
- [x] Markup help text. Currently, we only support text based help content, stored in a JSON encoded file. Being able to
  provide more complex help content could make the tool more useful as it would allow linking to other resources.
