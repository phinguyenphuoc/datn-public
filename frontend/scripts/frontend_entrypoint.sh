#!/bin/bash
#set -x

echo "Node Version:  $(node -v)"
echo "Node ENV:      $NODE_ENV"
echo "Npm Version:   $(npm -v)"

exec "$@"
