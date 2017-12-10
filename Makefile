# ------------------------------------------------------------------------
#
# General stuff
#

# Detect OS
OS = $(shell uname -s)

# Defaults
ECHO = echo

# Make adjustments based on OS
# http://stackoverflow.com/questions/3466166/how-to-check-if-running-in-cygwin-mac-or-linux/27776822#27776822
ifneq (, $(findstring CYGWIN, $(OS)))
	ECHO = /bin/echo -e
endif

# Colors and helptext
NO_COLOR	= \033[0m
ACTION		= \033[32;01m
OK_COLOR	= \033[32;01m
ERROR_COLOR	= \033[31;01m
WARN_COLOR	= \033[33;01m

# Which makefile am I in?
WHERE-AM-I = $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_MAKEFILE := $(call WHERE-AM-I)

# Echo some nice helptext based on the target comment
HELPTEXT = $(ECHO) "$(ACTION)--->" `egrep "^\# target: $(1) " $(THIS_MAKEFILE) | sed "s/\# target: $(1)[ ]*-[ ]* / /g"` "$(NO_COLOR)"

# Check version  and path to command and display on one line
CHECK_VERSION = printf "%-15s %-10s %s\n" "`basename $(1)`" "`$(1) --version $(2)`" "`which $(1)`"



# ------------------------------------------------------------------------
#
# Specifics
#
BIN        := .bin
NODEMODBIN := node_modules/.bin

PHPUNIT := $(BIN)/phpunit
PHPLOC 	:= $(BIN)/phploc
PHPCS   := $(BIN)/phpcs
PHPCBF  := $(BIN)/phpcbf
PHPMD   := $(BIN)/phpmd
PHPDOC  := $(BIN)/phpdoc
BEHAT   := $(BIN)/behat

SHELLCHECK := $(BIN)/shellcheck
BATS       := $(BIN)/bats

HTMLHINT  := $(NODEMODBIN)/htmlhint
CSSLINT   := $(NODEMODBIN)/csslint
STYLELINT := $(NODEMODBIN)/stylelint
JSCS      := $(NODEMODBIN)/jscs
ESLINT    := $(NODEMODBIN)/eslint
JSONLINT  := $(NODEMODBIN)/jsonlint
JSYAML    := $(NODEMODBIN)/js-yaml
HTMLMINI  := $(NODEMODBIN)/html-minifier
CLEANCSS  := $(NODEMODBIN)/cleancss
UGLIFYJS  := $(NODEMODBIN)/uglifyjs
MOCHA     := $(NODEMODBIN)/mocha
NYC       := $(NODEMODBIN)/nyc
COVERALLS := $(NODEMODBIN)/coveralls
CODECOV   := $(NODEMODBIN)/codecov



# target: help               - Displays help.
.PHONY:  help
help:
	@$(call HELPTEXT,$@)
	@$(ECHO) "Usage:"
	@$(ECHO) " make [target] ..."
	@$(ECHO) "target:"
	@egrep "^# target:" $(THIS_MAKEFILE) | sed 's/# target: / /g'


# Start server and client
.PHONY: start
start:
	cd server && docker-compose up -d express && cd - && cd client && npm start

# ------------------------------------------------------------------------
#
# Theme
#
# target: theme              - Do make build install in theme/ if available.
.PHONY: theme
theme:
	@$(call HELPTEXT,$@)
	[ ! -d theme ] || $(MAKE) --directory=theme build install
	#[ ! -d theme ] || ( cd theme && make build install )
