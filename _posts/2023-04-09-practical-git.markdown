---
layout: post
title:  "Practical git usage"
date:   2023-04-09 09:00:00 -0500
tags: programming
---

I use `git` almost daily both personally and professionally, and my usage
follows a pretty regular pattern. By sticking to this pattern, I rarely get
into a sticky situation or unexpected state. As many can attest, `git` is a
beast of a CLI tool, but these workflows have been enough to keep my projects
organized.


### Personal usage

Repositories where you're the sole contributor are a lot easier to manage than a
group project, so let's start with that. Here's my workflow:

1. Add a feature / modify the code
2. Add the changes to the staging area with `git add -p`
3. Commit the staged changes with `git commit -v`

That's pretty much it. If I want to experiment with a new feature or
alternative approach, I'll checkout a new branch with `git checkout -b
feature-branch`. When the branch is good enough, I'll merge it back into `main`
with `git merge feature-branch`.


### Team usage

Using `git` on a team is a different story. It's not uncommon to encounter
conflicts, which can be frustrating but manageable. There's also usually a code
review process, so working directly on `main` is restricted. Here's how I
handle those situations:

1. Make sure `main` is up to date with `git pull`
2. Create a feature branch with an appropriate name with `git checkout -b feature-branch`
3. Add a feature / modify the code
4. Add the changes to the staging area with `git add -p`
5. Commit the staged changes with `git commit -v`
6. Push the changes to origin with `git push -u origin feature-branch`
7. Create a pull request in GitHub UI (the link is usually printed when pushing
   in the previous step)

At this point, I'll wait for a review and address any comments that arise. If
another change gets merged and causes a conflict, I'll fix it by taking the
following steps:

1. Make sure I'm on `feature-branch`
2. Fetch origin changes with `git fetch origin main`
3. Rebase my changes onto main with `git rebase origin/main`
4. When the rebase stops due to conflicts, fix them
    1. Identify the conflicts by doing a `git status`
    2. Edit the files to remove the conflicts
    3. Tell `git` the conflicts have been resolved with `git add path/to/conflicting/files`
5. Continue rebasing with `git rebase --continue`
6. Repeat step 4 until the rebase finishes
7. Force push to update my PR with `git push --force-with-lease`

Those are the two big flows that get me through pretty much everything when
working on a team. On rare occasions I may have a feature branch off of another
one of my feature branches (to keep pull requests a manageable size). For
example `feature-part1` and `feature-part2`. When the `feature-part1` gets
merged, I'll rebase `feature-part2` to branch off of `main` with `git rebase
--onto main feature-part1 feature-part2`.

To visualize what that looks like:

```
Before    o---o---o---o---o  main
               \
                o---o---o---o---o  feature-part1
                                 \
                                  o---o---o  feature-part2

After    o---o---o---o---o  main
             |            \
             |             o'--o'--o'  feature-part2
              \
               o---o---o---o---o  feature-part1
```

## Notes on commands

* `git add -p` will interactively add each **patch**. I like to use it as a
  self review to help catch bugs early and scope commits to a single logical
  change. My one complaint is that it won't add newly created files.
* `git commit -v` shows all the changes that will be committed. While I don't
  read through them, I tend to use it as a reference when constructing the commit
  message.
* `git push --force-with-lease` force pushes only if no one has added commits
  to the remote branch (which prevents accidentally erasing those commits)
* `git log --graph --decorate --all` shows the entire git history as a
  graph and can be useful to situate where everything is.
