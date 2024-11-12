---
date: "2023-07-26T09:00:00Z"
tags: programming
title: Some git aliases
---


Have you ever wanted to know



I definitely stole these from somewhere.


```
[alias]
    checkout-pr = !sh -c 'git fetch origin pull/$1/head:pr/$1 && git checkout pr/$1' -
    oldest-ancestor = !zsh -c 'diff -u <(git rev-list --first-parent "${1:-main}") <(git rev-list --first-parent "${2:-HEAD}") | sed -ne \"s/^ //p\" | head -1' -
    branch-files = !sh -c 'git diff --name-only --no-merges --first-parent $(git oldest-ancestor origin/main)..HEAD | cat'
```
