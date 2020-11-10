# Typescript Server Template

In development, watch TS src and re-run compiled JS server simultaneously with

`yarn watch`

and in another terminal

`yarn dev`

In production, build with

`yarn build`

Run the server without watching changes with

`yarn start`

## Using the template

You can base a new Github repo on this template with the Github cli:

```sh
gh repo create my-repo --private --template mitschabaude/typescript-server-template
cd ./my-repo
git pull origin master
yarn
```

On the other hand, you typically want to start developing without publishing to Github. To do so, simply clone the repo and remove the .git folder.

```sh
git clone git@github.com:mitschabaude/typescript-server-template.git my-repo
cd ./my-repo
rm -rf .git
yarn
```
