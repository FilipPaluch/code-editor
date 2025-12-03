#!/bin/bash
docker-compose run --rm antlr bash -c "cd /workspace/src/app/mappings && java -jar /usr/local/lib/antlr-4.13.1-complete.jar -Dlanguage=TypeScript -visitor -o generated MappingsGrammar.g4"