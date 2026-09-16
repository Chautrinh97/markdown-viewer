#!/bin/bash

browser=$1

# set current working directory to directory of the shell script
cd "$(dirname "$0")"

# before
npm ci 2> /dev/null || npm i
git -c https.proxy="" clone --depth 1 --branch v0.1.0 https://github.com/gadenbuie/cleanrmd.git
mkdir -p ../../themes

# minify

# github
npx csso --input node_modules/github-markdown-css/github-markdown-light.css --output ../../themes/github.css
npx csso --input node_modules/github-markdown-css/github-markdown-dark.css --output ../../themes/github-dark.css

# themes (only themes with a real light+dark pair, or that self-adapt via prefers-color-scheme)
npx csso --input cleanrmd/inst/resources/bamboo/bamboo.css --output ../../themes/bamboo.css
npx csso --input cleanrmd/inst/resources/holiday/holiday.css --output ../../themes/holiday.css
npx csso --input cleanrmd/inst/resources/new.css/new.css --output ../../themes/new.css
npx csso --input cleanrmd/inst/resources/no-class/no-class.css --output ../../themes/no-class.css
npx csso --input cleanrmd/inst/resources/picocss/pico.css --output ../../themes/pico.css
npx csso --input cleanrmd/inst/resources/sakura/sakura.css --output ../../themes/sakura.css
npx csso --input cleanrmd/inst/resources/sakura-vader/sakura-vader.css --output ../../themes/sakura-vader.css
npx csso --input cleanrmd/inst/resources/simplecss/simple.css --output ../../themes/simple.css
npx csso --input cleanrmd/inst/resources/superstylin/superstylin.css --output ../../themes/superstylin.css
npx csso --input cleanrmd/inst/resources/vanilla/vanilla.css --output ../../themes/vanilla.css
npx csso --input cleanrmd/inst/resources/water/water.css --output ../../themes/water.css
npx csso --input cleanrmd/inst/resources/water-dark/water-dark.css --output ../../themes/water-dark.css

# after
rm -rf node_modules/ cleanrmd/

node fix-themes.js $browser
