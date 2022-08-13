---
layout: post
title:  "Copying a new SSH key to a passwordless server"
date:   2021-06-01 00:00:00 -0500
tags: tutorials
---
This is a scenario I have ran into a couple of times. I have a server
that doesn't allow logins with a password, and I need to setup a new
computer or operating system so it can login.

It's a simple problem, but I decided to record how I do it in case it
helps others. This method requires you to already have pubkey access
from another computer.

1. Copy the new public key to the computer that already has access

```bash
scp ~/.ssh/id_rsa.pub dipper:/tmp

# alternatively scp from dipper
scp mabel:~/.ssh/id_rsa.pub /tmp
```

2. From the computer that has access (`dipper` in this example), copy the
   ID to the server using `ssh-copy-id`

```bash
ssh-copy-id -fi /tmp/id_rsa.pub grunkel-stan
```

`-f` allows us to only use the public key and `-i` specifies the
identity file. That's it!
