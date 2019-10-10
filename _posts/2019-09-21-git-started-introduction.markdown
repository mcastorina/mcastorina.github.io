---
layout: post
title:  "Git Started: Introduction"
date:   2019-09-21 00:00:00 -0500
categories: tutorials
---
![git-started](/assets/git-started/banner.png)

This tutorial aims to explain Git in a way beginners can understand. These
series of posts, cleverly named ***Git Started***, will begin with the major
concepts, and we will explore how to use `git` later on.

## What Even is Git?
Many people will answer this by saying "Git is a version control
system for tracking changes in computer files." If you understand
this, great! I believe an easier way to think of Git is as a way to
save your files at different points in time. Like saving your video
game state in new save locations, so you can go back later and replay
the different paths. Git does exactly that, just with cheat codes to
modify the saved states.

### Branches
Okay, you are playing your favorite RPG video game, and you come to a
game changing choice. What do you do?

If you are anything like me, you save your game at that point, then
go and explore every outcome of the choice to find the best one. This
is exactly what Git branches are. Git allows you to **branch** off of an
existing save into a new universe where anything is possible. And you
can do this as many times as you want!

Imagine there are too many choices, though, and it would take too long
to explore each one. This is where you tag your best friend in and you
work in parallel. Similarly, Git lets other people create their own
universes too! That’s right, we’re going to throw more people at
this problem and let the best universe win.

### Merges
Great, so now that we explored all the outcomes in our video game, let’s
choose the best one. In Git, this is synonymous to a **merge**. You can add
all the changes made in the other universe to your universe by merging it
with yours. This is possible with any two universes, but sometimes they
do not agree. In those cases, we need to personally settle the conflicts.

### Changing History
Now we are deep in our video game, and we just find out that this one
choice at the very beginning of the game caused this huge negative
outcome! Let’s turn on our cheats and go change that decision.

Congratulations, you just learned what a **rebase** is. Git lets you go
back through your saves, modify them, and replay your following changes
afterwards.

## GitHub
As you may know, GitHub is a website that hosts projects and code. To work
with GitHub, you first need to **clone** a repository. This will download
all of the files from a project onto your computer. From then on, the
saves you make only exist on your computer, and you will need to **push**
them back into the cloud. You can also **pull** new saves to keep your local
copy up to date, in case your friend made progress.

Not only is GitHub a place to publish your projects, it’s also a
community for people to collaborate on a single project. They can open
issues to give feedback, ask for features, or describe bugs. Others
can also **fork** your project to spawn new universes to experiment in and
possibly even **request** you to **pull** their changes!

### Conclusion
Git is a fantastic tool that gives you complete control over your
<del>video game</del> project saves, and GitHub is a great place
to collaborate and publish your projects. Hopefully the above
concepts are easy to understand, and the
[next post]({% post_url 2019-10-10-git-started-basic-usage %})
in this series will go into the usage details of the Git CLI.
