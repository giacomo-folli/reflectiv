#!/bin/sh
set -e
ADAPTER=node npm run build
exec "$@"
