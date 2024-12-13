#!/bin/bash

set -euxo pipefail

if [ $# = 0 ]; then
  echo "Specify image iteration"
  exit
fi

id=$(podman build -q .) || (echo "Problem building image. Skipping."; exit)

podman tag ${id} everfree.forest:5000/ggrzybek/hawtio-online-tests-introspection-app:1.0-$1
podman push everfree.forest:5000/ggrzybek/hawtio-online-tests-introspection-app:1.0-$1

oc tag everfree.forest:5000/ggrzybek/hawtio-online-tests-introspection-app:1.0-$1 hawtio-online-tests-introspection-app:latest
