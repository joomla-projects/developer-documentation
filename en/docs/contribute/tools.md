---
title: How to contribute
description: Tools and workflow to contribute to Joomla developer documentation
author: JUG Extension developer
---

## General workflow

The documentation content is built with [Mkdocs](https://www.mkdocs.org/) and the [Mkdocs Material theme](https://squidfunk.github.io/mkdocs-material/).

Essentially, the documentation is made of simple text files in the Markdown format, located inside a hierarchy of directories.

!!! tip "Please refer to the [Mkdocs Material theme](https://squidfunk.github.io/mkdocs-material/) documentation for how to write and format your content."

New content, or changes to existing content is done in the same way code is modified:

- **fork** this repository
- make changes / add content in your fork
- submit a **Pull Request** to this repo. 

## Tools and Requirements

!!! info "The only thing absolutely required to make contribute to the documentation project is a [Github account](https://github.com/)."

- You can make simple changes directly on the Github.com website, after forking the documentation repository.

![Editing a documentation page directly on Github](../_images/github-editing.png)

- For more complex changes, or simply more convenience, use your regular git development workflow, with your preferred IDE (VSCode, Jetbrains IDES, Sublime Text,etc)

## Building and publishing

Once your proposed changes have been submitted through a **Pull Request**, an administrator will review them and, if accepted, merge them into the `main` branch. This process of building and publishing the updated documentation is automated using:

- *Github actions* for the build process: see `/.github/workflows/ci.yml` for configuration.
- *Mkdocs Material* configuration file located at `mkdocs.yml`, per language.

??? danger "Unless you are an administrator of this project, only change documentation content, located inside of the `/<language code>/docs` directory."
    Content in other directories is for building the documentation and publishing it automatically, it should not be modified unless by administrators. Pull Request attempting to change content outside of `/<language code>/docs` will likely not be accepted. 
