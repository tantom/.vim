" 不要使用vi的键盘模式，而是vim自己的
set nocompatible
" 不发出不不的声音
set noeb vb t_vb=

call pathogen#runtime_append_all_bundles()
call pathogen#helptags()
" 按键备忘-----------------------------------
" git submodule foreach git pull origin master
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
"*直接查询当前的单词并跳到下一个出现的位置,#跳回上一个
"%匹配的范围符号
"za 展开当前fold
":number 跳到对应的行上
"[<tab> 跳到变量定义的位置,然后可以按*跳到下一个#跳到上一个
":noh关闭高亮
"----------------------------------------
"快捷键映射
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
imap ,h <ESC>^i
imap ,g <ESC>0i
imap ,l <ESC>$a
nmap ,h ^
nmap ,g 0
nmap ,l $
imap ,v <ESC>v
imap ,V <ESC>V
inoremap ,e <ESC>g;<ESC>i
inoremap ,r <ESC>g,<ESC>i
inoremap ,w <ESC>:w<C-M>
nnoremap ,w :w<C-M>
inoremap ,s <ESC>I<ESC>v$
nnoremap ,e <ESC>g;<ESC>
nnoremap ,r <ESC>g,<ESC>
let g:user_zen_expandabbr_key = ',z'
inoremap ,dw <ESC>viw"_d<ESC>i
inoremap ,dl <ESC>"_dd<ESC>i
inoremap ,u <ESC>u<ESC>i
nnoremap ,u <ESC>u
nnoremap c "_d
inoremap ,/ <ESC>/
"输入模式下跳到下一个查找位置
inoremap ,n <ESC>nn<ESC>i
"覆盖dd且不填进剪切板
nnoremap ,dl "_dd
inoremap ,y <ESC>Vyi
inoremap ,p <c-r>*
"在当前行下面增加一个空行并跳到开始输入
inoremap ,o <ESC>o
"对齐block中的代码
inoremap ,a <ESC>=i{
inoremap ,qq <ESC>:q!<C-M>
nnoremap ,qq :q!<C-M>
inoremap ,gd <ESC>gd<ESC>i
inoremap ,gh <ESC>gg<ESC>i
inoremap ,ge <ESC>G<ESC>i
inoremap ,* <ESC>*<ESC>i
inoremap ,# <ESC>#<ESC>i
inoremap ,< {<cr>}
inoremap ,> <ESC>]}<ESC>i
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
 " 允许backspace和光标键跨越行边界
set whichwrap+=<,>,h,l,[,]      
"设定字体
set guifontwide=新宋体:h11:cGB2312



"自动补全
" set completeopt=longest,menu
set completeopt=menuone,preview
" 增强模式中的命令行自动完成操作
set wildmenu

autocmd FileType ruby,eruby set omnifunc=rubycomplete#Complete
autocmd FileType python set omnifunc=pythoncomplete#Complete
autocmd FileType html,ejs set omnifunc=htmlcomplete#CompleteTags
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType xml set omnifunc=xmlcomplet:#CompleteTags
autocmd FileType java set omnifunc=javacomplete#Complet
autocmd FileType javascript setl omnifunc=jscomplete#CompleteJS

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
set smarttab
set tabstop=4
set shiftwidth=4
set softtabstop=4
set ai "开启自动缩进
set si "智能缩进
"set expandtab "自动把tab转化为空格
"retab "将已存在的tab都转化为空格

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

let g:AutoPairsFlyMode = 0
let g:AutoPairsShortcutBackInsert = '<M-b>'

"附加ejs也当作html对待
au BufNewFile,BufRead *.ejs set filetype=html


set wildignore+=*/.git/*,*/.hg/*,*/.svn/*,*/tags,*/node_modules/*,*/jquery*min*
let g:acp_enableAtStartup = 1
let g:acp_mappingDriven = 0
let g:acp_ignorecaseOption = 1
let g:acp_behaviorKeywordIgnores = ["get", "set", "use", "log"]
let g:acp_completeOption = '.,w,b,u,t,i,k'
let g:acp_completeoptPreview = 0
let g:acp_behaviorKeywordLength = 2
let g:acp_behaviorHtmlOmniLength = 1


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


"配置ultisnips
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<tab>"
let g:UltiSnipsJumpBackwardTrigger="<s-tab>"
let g:UltiSnipsListSnippets="<c-l>"
let g:UltiSnipsEditSplit = "vertical"

"javascript 补全
let g:jscomplete_use = ['dom', 'moz']
let g:node_usejscomplete = 1
let jsbehavs = { 'javascript': [] }
    call add(jsbehavs.javascript, {
        \   'command' : "\<C-n>",
        \   'meets'   : 'acp#meetsForKeyword',
        \   'repeat'  : 0,
        \ })
    call add(jsbehavs.javascript, {
        \   'command'  : "\<C-x>\<C-o>",
        \   'meets'   : 'acp#meetsForKeyword',
        \   'repeat'   : 0,
    \})

let g:acp_behavior = {}
call extend(g:acp_behavior, jsbehavs, 'keep')
