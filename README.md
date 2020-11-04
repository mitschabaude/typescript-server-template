# Typescript Server Template

In development, watch TS src and re-run compiled JS server simultaneously with

`yarn watch`

and in another terminal

`yarn start`

## Using the template

You can base a new Github repo on this template with the Github cli:

`gh repo create my-repo --private --template mitschabaude/typescript-server-template`

Afterwards, `cd` into the new folder and `git pull origin master` to actually get the files.

On the other hand, you typically want to start developing from a template without publishing to Github right away. To do so, simply clone the repo and remove the .git folder.

`git clone git@github.com:mitschabaude/typescript-server-template.git my-repo`
`cd ./my-repo`
`rm -rf .git`