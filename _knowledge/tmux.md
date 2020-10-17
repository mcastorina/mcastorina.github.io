---
layout: default
title:  "tmux"
category: Software Development
---

# tmux
`tmux` is a terminal multiplexer that allows for multiple virtual
terminals to be created and controlled from a single screen. `tmux` may
be detached from a screen and continue running in the background, then
later reattached.

It is great especially to ssh into another computer for long running jobs
or simply have access to multiple terminals from the same ssh connection.

## Usage
From the command line, you may start a new session or attach to an
existing session like so.

```
tmux new-session  # start a new session
tmux a            # attach to an existing session
```

Similar to `screen`, `tmux` uses a leader key before each command to
distinguish it from the program in the terminal. Normally, this is `C-b`.

The following keybinds are a result of my [configuration](#configuration) file.

| Key Bind | Command |
| -------- | ------- |
| `C-b c`  | Create a new window |
| `C-b 0`  | Switch to window 0 |
| `C-b -`  | Create a vertical pane |
| `C-b \`  | Create a horizontal pane |
| `C-b h`  | Switch to the left pane |
| `C-b l`  | Switch to the right pane |
| `C-b k`  | Switch to the top pane |
| `C-b j`  | Switch to the bottom pane |
| `C-b d`  | Detach from tmux |

## Configuration
`tmux` may be configured with a `$HOME/.tmux.conf` file. Below is a
snippet of my configuration that I prefer over the defaults.

```
# vi mode
setw -g mode-keys vi

# create new window in the home path
bind c new-window -c "~"

# split panes using \ and -
bind \\ split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# set escape time 0
set -sg escape-time 0

# switch panes using Alt-hjkl without prefix
# or hjkl with prefix
bind -n M-h select-pane -L
bind -n M-l select-pane -R
bind -n M-k select-pane -U
bind -n M-j select-pane -D

bind h select-pane -L
bind l select-pane -R
bind k select-pane -U
bind j select-pane -D
```

My full configuration file can be found
[here](https://github.com/mcastorina/dotfiles/blob/master/common/.tmux.conf).
