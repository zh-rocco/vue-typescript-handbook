#!/usr/bin/env bash

git init

cp ./git-hooks/pre-push .git/hooks/pre-push

chmod 777 .git/hooks/pre-push

echo -e "\x1B[32m >>> pre-push hook init successfully!\x1B[0m"
