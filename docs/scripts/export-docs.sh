#!/bin/sh
docker run --rm -i yousan/swagger-yaml-to-html < docs/swagger.yaml > docs/index.html
sed "s|</style>|  .topbar{display: none;}\n  </style>|" docs/index.html >docs/temp && mv docs/temp docs/index.html