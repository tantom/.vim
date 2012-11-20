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
"扩大一个窗口:res +40 <c+w>方向键在不同的窗体中跳转 
":vert help command 竖向打开帮助
"FuzzyFinder时选中文件按<c-j>竖向打开文件
"定期需要ctags -R一下
"VbookmarkClearAll删除所有标记
"gg跳到行首,v G跳到末行,$跳到最后
"curl -v -H 'Content-Type: application/json' -X PUT -d '{"test":{"subject":"tools"}}' \http://localhost:3000/
"----------------------------------------

"快捷键映射
" let mapleader = ","
nmap <F5> :call g:Jsbeautify()<CR>  
nnoremap <silent> <F3> :Grep<CR>
imap ,, <ESC>
vmap ,, <ESC> 
imap ,f <ESC>:FufFileWithCurrentBufferDir **/<C-M> 
imap ,b <ESC>:FufBuffer<C-M>
imap ,t <ESC>:FufBufferTagAll<C-M>
imap ,p <ESC>:FufTag<C-M>
imap ,s <ESC>:w<C-M>i
map ,f :FufFileWithCurrentBufferDir **/<C-M> 
map ,b :FufBuffer<C-M>
map ,t :FufBufferTagAll<C-M>
map ,p :FufTag<C-M>

map ,w <c-w>
imap ,w <c-w>

" 使用 Visual Stdio 书签的按键方式
inoremap ,m <ESC>:VbookmarkToggle<CR>i
nnoremap ,m :VbookmarkToggle<CR>
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
" 不要使用vi的键盘模式，而是vim自己的
set nocompatible

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



