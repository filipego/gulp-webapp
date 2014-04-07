Gulp-webapp
===

A boilerplate for Grunt:

- GULP
- livereload
- SASS with Compass
- static file server [http://localhost:8080/](http://localhost:8080/) 


## Tasks:

- **gulp serve** - when in development
- **gulp build** - build the whole stuff

## Get started

```shell
git clone --depth 1 https://github.com/filipego/gulp-webapp.git myapp && cd $_
npm install && bower install
```


## Boilerplate structure

```
Gulp Boilerplate Structure
|   .bowerrc
|   .gitignore
|   bower.json
|   Gulpfile.js
|   package.json
|   README.md
|
+---app
|   |   index.html
|   |
|   +---components
|   |       first.js
|   |       second.js
|   |
|   +--js
|   |       app.js
|   |
|   +--css 
|   |       style.css
|   |
|   \---sass
|           style.scss
|
+---dest
|
+---node_modules
```
