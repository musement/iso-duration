## Rollup-ts-starter

#### How to use it:
```
git clone //this repo
rm -rf .git
git init
git add . 
git commit -m "chore: init"
npm install
npm run release -- --first-release
```

#### Starter config:
* Typescript (Static types)
* Jest (Unit tests)
* ESLint + Prettier (Linter configuration)
* Commitlint with conventional-commit support (Linter for git commit message )
* Husky (git hooks): 
  * pre-commit - lint only implemented changes code and if it's possible fix lint error
  * commit-msg - lint commit message to fit conventional-commit pattern
  * pre-push - type check and unit tests
* lint-staged (run specific command only against implemented changes)
* standard-version (create releases and CHANGELOG.md basing on commit messages)

