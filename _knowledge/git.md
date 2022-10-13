---
layout: post
title:  "Git"
category: Software Development
---

Git is a revision control system that is very popular in software
development. Sites like [GitHub](https://github.com) and
[GitLab](https://gitlab.com) offer hosting services for your projects.
I enjoy using Git for my projects because I see it as saving snapshots
in time, and I will always be able to go back to that version, no
matter how much I experiment. I have written a
[couple of blog posts]({% post_url 2019-09-21-git-started-introduction %})
on the subject as well.

## Config
The default Git config should be located at `$HOME/.gitconfig`.
Here you can set your user name and email, aliases, diff settings
for filetypes, global `.gitignore` and many other settings.

```
[user]
    name = Miccah Castorina
    email = contact@miccah.io
[diff "docx"]
    textconv = docx2txt
[alias]
    lg1 = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
    lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
    lg = !"git lg1"
[rerere]
    enabled = true
    autoupdate = true
[core]
    excludesfile = ~/.gitignore
[url "ssh://git@github.com/"]
    insteadOf = https://github.com/
```

## Setup
```bash
git init
git add README.md
git commit
git push -u origin master
```

## Add Upstream
```bash
git remote add-url upstream $UPSTREAM_URL
# view remotes
git remote -v
```

## Add Changes
Whenever adding changes, I almost always use `git add -p` to
interactively add each patch. I like to do this because I can review
all of my changes to catch any mistakes. It is like a self code-review
each time I commit.

```bash
# add each patch interactively
git add -p
# manually edit patches to be added
git add -e
```

## Branches
```bash
# create new branch
git checkout -b new-branch
# list branches
git branch
# delete branch
git branch -D new-branch
```

## Diff
```bash
# what changed in the last commit
git diff HEAD~1 HEAD
# what changes are staged
git diff --staged
```

## Log
```bash
git log --graph --decorate --all --shortstat    # aliased to glgga
# search for string in history and display patches
git log -p -S string
```

## Fetch and Pull
Fetch simply gets the changes from the remote, while pull actually
pulls those changes into your current branch. Usually I will do a
fetch before rebase and rarely ever pull. The only time I pull is
to keep my local copy of `master` up to date with `upstream/master`
and, it should never create a new commit.

## Rebase
```bash
# move current branch to branch off of upstream/master
git rebase upstream/master
# automatically accept their changes over ours
git rebase -f -X theirs upstream/master
```

## Cherry Pick
Cherry pick is an operation that creates a new commit applying the
patches from another commit. I try not to use it as much because
it does not preserve history, but it can be useful at times.

```bash
git cherry-pick $BRANCH_OR_COMMIT_HASH
```
