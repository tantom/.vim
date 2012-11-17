VIM Configuration
==========================
easy copy for vps server-side develop.

Update Centos 5.7 default Vim7 ->  Vim7.3
------------
	yum install ncurses-devel
	yum install ruby-devel
	yum install python-devel
	wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2
	tar -xjf vim-7.3.tar.bz2 .
	cd vim73

	./configure --disable-selinux --enable-pythoninterp --enable-python3interp --enable-rubyinterp --enable-multibyte --enable-fontset --with-vim-name=vi --with-features=huge 

	make
	make install 


	rm /usr/bin/vim
	ln -s /usr/local/bin/vim /usr/bin/vim

Plugins
------------------
### align
Help folks to align text, equals, declarations, tables, etc.

Usage:

* press v or V change to visual mode,select the lines that need to be align
* press : ``Align=`` Align on =

###  
