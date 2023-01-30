#!/bin/bash
 
# wait rabbitmq service
while ! ncat -z rabbitmq 15672; do
echo 'waiting for rabbitmq container...'
  sleep 1
done
 
# wait redis service
# while ! nc -z db 6379; do
# echo 'waiting for db container...'
#   sleep 1
# done
 
node index.js