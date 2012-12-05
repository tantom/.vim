" 不要使用vi的键盘模式，而是vim自己的
set nocompatible
" 不发出不不的声音
set noeb vb t_vb=

call pathogen#runtime_append_all_bundles()
call pathogen#helptags()
 
" 操作记录, 按v进入选择模式,d剪切,y复制,p粘贴
" u撤销操作 ctrl+r重新操作 /查找 n继续下一个
" ctrl+w v 左右分屏 ctrl+w s 上下分屏, sp[vsp] file 分屏打开文件 ctrl+w  c[q]关闭窗口
" ZZ 保存并退出
"两个连续的逗号等同于ESC :%s/one/two 将one替换为two,加上/g为全部替换
"@不加%表示从此往下,加了代表全文替换
"ctrl-/ 连续按两次注析行
"选择中行后按=号对齐代码
":vert help command 竖向打开帮助
"VbookmarkClearAll删除所有标记
"gg跳到行首,v G跳到末行,$跳到最后 I 跳到行首
"curl -v -H 'Content-Type: application/json' -X PUT -d '{"test":{"subject":"tools"}}' \http://localhost:3000/
"i=inner di" clear words before "
"#高亮当前单词
"A跳到行末并进入输入模式 I跳到行首并进入输入
"----------------------------------------
"g; go back g, go forward
"快捷键映射
" let mapleader = ","
nmap <F5> :call g:Jsbeautify()<CR>  
imap ,, <ESC>
vmap ,, <ESC> 
cmap ,, <ESC>
omap ,, <ESC>
nmap ,, <ESC>

inoremap ,m <ESC>:CtrlPMRU<C-M>
nnoremap ,m <ESC>:CtrlPMRU<C-M>
inoremap ,f <ESC>:CtrlPCurFile<C-M>
nnoremap ,f <ESC>:CtrlPCurFile<C-M>
inoremap ,c <ESC>:CtrlPChangeAll<C-M>
nnoremap ,c <ESC>:CtrlPChangeAll<C-M>
imap ,; <ESC>$a;
imap ,l <ESC>$a
imap ,a <ESC>I
imap ,v <ESC>v
imap ,V <ESC>V
inoremap ,; <ESC>g;<ESC>i
inoremap ,' <ESC>g,<ESC>i
inoremap ,w <ESC>:w<C-M>
inoremap ,s <ESC>I<ESC>v$
let g:user_zen_expandabbr_key = ',z'
inoremap ,d <ESC>viw"_d<ESC>i

nnoremap c "_d

" 使用 Visual Stdio 书签的按键方式
inoremap ,b <ESC>:VbookmarkToggle<CR>i
nnoremap ,b :VbookmarkToggle<CR>
nnoremap <silent> <F2> :VbookmarkNext<CR>
nnoremap <silent> <S-F2> :VbookmarkPrevious<CR>

nmap <c-a> ggVG <S-end>
imap <c-a> <ESC> ggVG <S-end>
" 设置mac中直接复制到剪切板
set clipboard+=unnamed
let Grep_Default_Options = '-i' 
syntax on

filetype plugin indent on 
"vim7.3要这个来修正后退功能键
set backspace=indent,eol,start
" 文件修改之后自动载入
set autoread          
" 设置256色的主题支持
set t_Co=256
" 设定主题
color jellybeans
" 默认显示行号
set nu

" 设定默认解码
set fenc=utf-8
set fencs=utf-8,usc-bom,euc-jp,gb18030,gbk,gb2312,cp936

"高亮光标所在的行
set cursorline 

"设定字体
set guifontwide=新宋体:h11:cGB2312



"自动补全
set completeopt=longest,menu
" 增强模式中的命令行自动完成操作
set wildmenu

autocmd FileType ruby,eruby set omnifunc=rubycomplete#Complete
autocmd FileType python set omnifunc=pythoncomplete#Complete
autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS
autocmd FileType html,ejs set omnifunc=htmlcomplete#CompleteTags
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType xml set omnifunc=xmlcomplet:#CompleteTags
autocmd FileType java set omnifunc=javacomplete#Complet

" 高亮显示匹配的括号
set showmatch
" 匹配括号高亮的时间（单位是十分之一秒）
set matchtime=5
" 在搜索的时候忽略大小写
set ignorecase
" 高亮被搜索的句子（phrases）
set hlsearch
" 在搜索时，输入的词句的逐字符高亮（类似firefox的搜索）
set incsearch

"缩进处理
set tabstop=4
set shiftwidth=4
set softtabstop=4
set ai "开启自动缩进
"set expandtab "自动把tab转化为空格
"retab "将已存在的tab都转化为空格

" 自动使用新文件模板
" autocmd BufNewFile *.py 0r ~/.vim/template/simple.py
"
" autocmd FileType html set shiftwidth=4 tabstop=4 expandtab
" autocmd BufNewFile *.html 0r ~/.vim/template/simple.html

"不备份
set nobackup
set nowritebackup
set noswapfile

"设置powerline
set laststatus=2
let g:Powerline_symbols = 'fancy'
let g:Powerline_stl_path_style = 'full'

" 禁用默认的按键绑定
let g:vbookmark_disableMapping = 1
let g:vbookmark_bookmarkSaveFile = $HOME . '/.vimbookmark'


function! ConditionalPairMap(open, close)
  let line = getline('.')
  let col = col('.')
  if col < col('$') || stridx(line, a:close, col + 1) != -1
    return a:open
  else
    return a:open . a:close . "\<left>" . "\<cr>" . "\<cr>" . "\<up>" . "\<tab>"
  endif
endf
inoremap <expr> { ConditionalPairMap('{', '}')



au BufNewFile,BufRead *.ejs set filetype=html


set wildignore+=*/.git/*,*/.hg/*,*/.svn/*,*/tags,*/node_modules/*,*/jquery*min*
let g:acp_mappingDriven = 0
let g:acp_ignorecaseOption = 1
let g:acp_behaviorKeywordIgnores = ["get", "set", "use", "log"]
let g:acp_completeOption = '.,w,b,u,t,i,k'

let g:ctrlp_working_path_mode = 'rc'
let g:ctrlp_custom_ignore = {
  \ 'dir': 'node_modules',
  \ 'file': '\.pyc$\|\.mp3$\|\.flac$\|\.swp$\|\.o$',
  \ 'link': '',
  \ }


" Set the default opening command to use when pressing the above mapping: >
let g:ctrlp_cmd = 'CtrlPMixed'


" Change the listing order of the files in the match window. The default setting
" (1) is from bottom to top: >
let g:ctrlp_match_window_reversed = 0

" fix the rgrep 
if has('mac')
  if system('which gxargs')
    let Grep_Xargs_Path = 'gxargs'
  else
    let Grep_Find_Use_Xargs = 0
  endif
endif

"配置ultisnips
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<tab>"
let g:UltiSnipsJumpBackwardTrigger="<s-tab>"
let g:UltiSnipsListSnippets="<c-l>"
let g:UltiSnipsEditSplit = "vertical"


