---
layout: post
title:  "Git Started: Advanced Tips"
date:   2019-10-19 00:00:00 -0500
categories: tutorials
---
![git-started](/assets/git-started/banner.png)

This tutorial aims to explain Git in a way beginners can understand.
This is the third post of the cleverly named series ***Git Started***.
In this post, I will share some useful tips for using `git` on the command
line. For a conceptual understanding of Git, please refer to the first post:
[Git Started: Introduction]({% post_url 2019-09-21-git-started-introduction %}).
For an introduction on `git` CLI usage, please refer to the second post:
[Git Started: Basic Usage]({% post_url 2019-10-10-git-started-basic-usage %}).

## Patches
Any change to a versioned file is a **patch**. Back when the dinosaurs
roamed the ARPANET, a patch could be sent by email and applied to the
source. However possible today, that is generally not necessary.

With that background, here is your *Pro Tip!!!*: Git allows to **add**
patches via `git add -p`.

Whenever I stage my changes, I almost always use `git add -p` because it forces
me to actually see what I did. It is a self code-review before anyone else
reviews it, and more often than not it has helped me catch bugs before ever
running the code.

Bonus *Pro Tip!!!*: `git diff --staged` or `git diff --cached` will show
you the changes already added.

## I've Made a Mistake
Fixing small mistakes in your last commit is simply adding the (corrected)
changes, then **amending** the commit.

*Pro Tip!!!*: `git commit --amend --no-edit` to make amends.

To fix any mistakes in a previous commit, you will have to **rebase**
which translates to modifying that commit and then applying all the
patches after it. The easiest way that I like to rebase is interactively:
`git rebase -i HEAD~10`.

## Catch Up to Master
Generally when working on a feature branch, you will branch off of master
then make a PR to get your changes in. In that time it takes you to write
your feature, master can update causing your feature branch to become out
of date.

*Pro Tip!!!*: Catch up to master with `git rebase -f -X theirs upstream/master`.

When ran from your feature branch, this command will rebase (apply feature
branch's changes) onto `upstream/master`. It will also automatically
resolve conflicts by choosing the changes in `upstream/master` over
your changes.

```
                     A---B---C topic
                    /
               D---E---F---G master

       From this point, the result of following command:

           git rebase -f -X theirs master

       would be:

                             A'--B'--C' topic
                            /
               D---E---F---G master
```

## Logs
The last tip is for those who need a better visual of Git history
(including myself). This is how I always view the Git log.

*Pro Tip!!!*: `git log --graph --decorate --all` to view a full graph
log of the entire repository history. For [Oh My Zsh!](https://ohmyz.sh/)
users, this is equivalent to the alias `glgga`.

Bonus *Pro Tip!!!*: `git log -p` to show patches changed in each commit
and `git log -S string` to search for commits that have added or deleted
"string". Combine the two for an easy way to search your history!

## Conclusion
This concludes the cleverly named ***Git Started*** series.  Hopefully
you learned something new about Git and can confidently use the `git` CLI.
