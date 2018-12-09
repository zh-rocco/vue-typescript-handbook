#!/usr/bin/env bash

git init

cp ./git-hooks/pre-commit .git/hooks/pre-commit

chmod 777 .git/hooks/pre-commit

echo -e "\x1B[32mpre-commit hook init successfully!\x1B[0m"
