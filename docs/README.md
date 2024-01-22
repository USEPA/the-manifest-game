# Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [specification](#specification)

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

## Future Work

1. It should be possible to link to a specific node in the decision tree so that the tree starts at that node open upon
   visiting the page.
2. The widget should be configurable with a JSON file to allow for easy updates and use of multiple decision
   trees.
