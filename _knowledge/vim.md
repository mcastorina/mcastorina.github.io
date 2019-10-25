---
layout: default
title:  "vim"
category: Things I Like
---

# vim

## Plugins
- [myusuf3/numbers.vim](https://github.com/myusuf3/numbers.vim): Relative line numbering
- [tpope/vim-commentary](https://github.com/tpope/vim-commentary): Comment out lines with `gc`
- [tpope/vim-surround](https://github.com/tpope/vim-surround): Change surrounding characters (`'``"``` ` ```()``[]``{}`)with `cs[(`
- [iamcco/markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim): Render markdown file in realtime with `:MarkdownPreview`
- [airblade/vim-gitgutter](https://github.com/airblade/vim-gitgutter): Show git diff in the gutter

## Default Binds

| Bind | Description |
| ---- | ----------- |
| `gf` | Goto file. Start editing the file under the cursor. |
| `gF` | Start editing the file under the cursor and jump to the line number following the filename. |
| `gd` | Goto definition. |
| `ga` | Print ASCII value of character under the cursor. |
| `]p` | Paste line matching indent of current line. |
| `-af` | Action around function (e.g. `daf` is delete around function) |
| `-as` | Action around sentence. |

## Custom Binds
```vimrc
" Semicolon in normal mode is the same as colon
nnoremap ; :

" Escape key also mapped as pushing j and k
inoremap jk <Esc>
inoremap kj <Esc>
autocmd InsertEnter * set timeoutlen=75
autocmd InsertLeave * set timeoutlen=1000

" Split moving
set splitbelow
set splitright
nnoremap <C-L> <C-W>w
nnoremap <C-H> <C-W>W

" Tab moving
nnoremap <C-J> :tabnext<CR>
nnoremap <C-K> :tabprev<CR>

" Format
nnoremap <C-O> !!fmt<CR>

" Goto file will open in new tab
map gf <C-W>gF
```
