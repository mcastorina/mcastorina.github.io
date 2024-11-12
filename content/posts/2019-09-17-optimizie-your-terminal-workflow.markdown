---
date: "2019-09-17T13:12:15Z"
tags: tutorials
title: Optimize Your Terminal Workflow
---
Working in a terminal emulator is great for getting things done
fast, and there are so many useful plugins and tools to make that
experience faster and easier. In this post I will share the most
useful tools and configurations that have improved my workflow
significantly. All of these configurations can be found on
[GitHub](https://github.com/mcastorina/dotfiles).

Before I get started, however, note that I am a vim user, so most
of the following will be vim-related. Actually, while we are on the
subject, let’s start the list off with vim!

## vim
My favorite text editor of all time is vim. It is extremely
customizable and extensible, not to mention extremely precise. Yes,
it is true that vim has a steep learning curve, but once the
keystrokes become muscle memory, working in vim is 10x faster than
any other text editor. For any purpose. Period. Here are some of
my tweaks that I have accumulated over the years.

#### **Faster Mode Switching**
As most know, context switching has a lot of overhead, or time
consumption. Whether you are switching between making dinner to
walking the dog or switching the active process in an operating
system, nothing is instantaneous. Such is the case when switching
between `NORMAL` and `INSERT` modes in vim. The escape key is just
so far away, and you have to lift your hand each time to leave
`INSERT` mode! With this tweak, pushing `j` and `k` fast enough
will exit into `NORMAL` mode. You can use any two keys, however `j`
and `k` are nice because very few English words contain that letter
combination.

```
" Escape key also mapped as pushing j and k
inoremap jk <Esc>
inoremap kj <Esc>
autocmd InsertEnter * set timeoutlen=75
autocmd InsertLeave * set timeoutlen=1000
```

#### **Faster :Commands**

I am constantly saving my work, opening new files to edit, or random
other colon-commands. All that `Shift` work makes my pinkie sore!
This tweak makes the semicolon do the same thing as colon. In other
words, I don’t have to keeping `Shift`ing when I want to save, quit,
substitute, or any other command. Normally the semicolon doesn’t
have a purpose, so it is perfect to make it function the same as
colon.

```
" Semicolon in normal mode is the same as colon
nnoremap ; :
```

#### **Tab Moving**

Okay, I know that I’m supposed to use vim buffers, but I have always
used splits / tabs, and I haven’t put the time in to learn buffers
yet. I like tabs because I can visually see what files I have open
and organize them accordingly. This tweak helps me move between
both tabs and splits in a vim-like way. `Ctrl` plus `j` and `k`
switch between tabs, and `Ctrl` plus `h` and `l` cycles between
splits.

```
" Tab moving
nnoremap <C-J> :tabnext<CR>
nnoremap <C-K> :tabprev<CR>

" Split moving
set splitbelow
set splitright
nnoremap <C-L> <C-W>w
nnoremap <C-H> <C-W>W
```

---
<br/>

## zsh
My preferred shell is zsh due to the number of plugins, themes, and
great tab completions. Besides the obvious vi-mode, below are my
favorite plugins that save me time and keystrokes.

#### **Autosuggestions**
Whenever I do something in the terminal, 95% of the time I have
done it before or something similar. zsh-autosuggestions lets me
easily see previous similar commands. All I have to do is remember
the first few characters! Combined with the below binds, I can
quickly accept the autosuggestion by pressing `Ctrl+l` and run the
command.

```
bindkey -v
bindkey '^f' vi-forward-blank-word
bindkey '^l' vi-end-of-line
```

This is the most useful zsh plugin, I cannot stress it enough.

#### **Aliases**
I believe keeping my hands on the keyboard keeps me working
efficiently, calmly, and happily. Sometimes I just get so frustrated
when I have to lift my hands to highlight something to copy and
paste. Especially in Windows where you have to go to the drop-down,
choose select, and then carefully highlight your selection! Anyway,
these aliases help keep me sane. I use these to copy (yank) the
output of commands or paste (put) the clipboard as an input.

```
# linux
alias yank="xclip -selection primary"
alias put="xclip -o -selection primary"
# osx
alias yank="pbcopy"
alias put="pbpaste"
# windows (cygwin)
alias yank="cat > /dev/clipboard"
alias put="cat /dev/clipboard"
```

Further in my quest to keep my hands on the keyboard, I use the
rxvt-unicode terminal emulator combined with certain plugins and
binds to use vim-style selection. I won’t go into the details here,
but I rarely use a mouse to copy from the terminal. tmux has a
similar keybind as well.

---
<br/>

## i3 window manager
If you have gotten this far, you may have noticed a theme to this
post: I like the keyboard. Well, the best window manager to keep
me happy is i3wm. It is a tiling window manager so I’m always using
the most space on the screen, but the best feature is the navigation.
Switching desktops is simply `alt` plus a number. Switching focus
on a desktop is `alt` plus `h`, `j`, `k`, or `l`. Moving windows?
Just add a `Shift`! Isn’t that fantastic?

```
set $alt Mod1

# change focus
bindsym $alt+h focus left
bindsym $alt+j focus down
bindsym $alt+k focus up
bindsym $alt+l focus right

# move focused window
bindsym $alt+Shift+h move left
bindsym $alt+Shift+j move down
bindsym $alt+Shift+k move up
bindsym $alt+Shift+l move right
```

Here’s something a little extra in case I really am not in the mood
to use a mouse.

```
bindsym $alt+Shift+m mode "mouse"
mode "mouse" {
    # escape keys
    bindsym Escape mode "default"
    bindsym q mode "default"

    # space to left click, shift space to right click
    bindsym space exec --no-startup-id "xdotool click 1"
    bindsym Shift+space exec --no-startup-id "xdotool click 3"

    # fine movement
    bindsym j exec --no-startup-id "xdotool mousemove_relative --  0  5"
    bindsym k exec --no-startup-id "xdotool mousemove_relative --  0 -5"
    bindsym h exec --no-startup-id "xdotool mousemove_relative -- -5  0"
    bindsym l exec --no-startup-id "xdotool mousemove_relative --  5  0"

    # coarse movement
    bindsym Shift+j exec --no-startup-id "xdotool mousemove_relative --    0  100"
    bindsym Shift+k exec --no-startup-id "xdotool mousemove_relative --    0 -100"
    bindsym Shift+h exec --no-startup-id "xdotool mousemove_relative -- -100    0"
    bindsym Shift+l exec --no-startup-id "xdotool mousemove_relative --  100    0"

    # scroll
    bindsym Ctrl+j exec --no-startup-id "xdotool click 5"
    bindsym Ctrl+k exec --no-startup-id "xdotool click 4"
    bindsym Ctrl+d exec --no-startup-id "xdotool click --repeat 4 5"
    bindsym Ctrl+u exec --no-startup-id "xdotool click --repeat 4 4"
    bindsym d exec --no-startup-id "xdotool click --repeat 4 5"
    bindsym u exec --no-startup-id "xdotool click --repeat 4 4"
}
```

---
<br/>

## Conclusion
As a devops engineer, I almost exclusively work in the terminal.
These tweaks and configurations help me focus on the task at hand,
rather than trying to remember commands and flags. I hope you found
them useful too! Maybe I should rename this post *How to Get Rid
of Your Mouse.*

By the way, I used to use Vimperator for Firefox before Quantum.
Unfortunately, I haven’t found a good replacement, so let me know
if you have any suggestions!
