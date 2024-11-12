---
date: "2020-12-13T00:00:00Z"
tags: programming
title: Vim REPL Driven Development
---

If you have ever programmed with REPL driven development, you will know
that it is like programming without a blind-fold on. It makes development
so much easier, faster, and have fewer errors.

So I decided to add a generic REPL to vim. This is so simple, yet so
effective and flexible. The idea is to send highlighted text to the
`terminal` window (included in vim already).

![Vim REPL](/assets/vim-repl.gif)

Since the terminal is running `bash`, you can execute `python` or `irb`
or any other interactive session and send the commands there as well.

## vimrc
Here is the code to make it work, just add it to your `~/.vimrc` file.

```vimrc
" hit Enter in visual mode to execute highlighted text in the terminal
vnoremap <Enter> :<C-u>call SendTerm()<CR>:<BS>

" credit: https://stackoverflow.com/a/6271254
function! s:get_visual_selection()
    " Why is this not a built-in Vim script function?!
    let [line_start, column_start] = getpos("'<")[1:2]
    let [line_end, column_end] = getpos("'>")[1:2]
    let lines = getline(line_start, line_end)
    if len(lines) == 0
        return ''
    endif
    let lines[-1] = lines[-1][: column_end - (&selection == 'inclusive' ? 1 : 2)]
    let lines[0] = lines[0][column_start - 1:]
    return join(lines, "\n")
endfunction

function! SendTerm()
    let data = s:get_visual_selection() . "\<CR>"
    " get the buffer window number for bash
    let bnr = buffer_number('!bash')
    if bnr > 0
        call term_sendkeys(bnr, data)
    else
        " spawn the bash terminal if not found
        vertical terminal bash
        call term_sendkeys(buffer_number('!bash'), data)
    endif
endfunction
```

---

**Update 2021-10-23:** There already exists a Vim plugin for this called [vim-slime](https://github.com/jpalardy/vim-slime)
