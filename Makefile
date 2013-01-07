JS_FILES = \
	src/pre.js \
	src/core.js \
	src/graphing/linegraph.js \
	src/post.js

JS_COMPILER = \
        uglifyjs

all: n3.js n3.min.js
n3.js: $(JS_FILES)
n3.min.js: $(JS_FILES)

n3.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

clean:
	rm -rf n3.js n3.min.js
