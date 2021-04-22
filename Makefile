
default: app open

open:
	open ./dist/index.html

app:
	npx webpack --config ./dev.config.js

watch:
	npx webpack serve --config ./dev.config.js