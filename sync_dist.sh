#!/bin/bash
aws s3 sync "/var/www/frontend/dist/fonts/" "s3://fanse-bucket/media/static/live/fonts/"
aws s3 sync "/var/www/frontend/dist/img/" "s3://fanse-bucket/media/static/live/img/"
aws s3 sync "/var/www/frontend/dist/js/" "s3://fanse-bucket/media/static/live/js/"
aws s3 sync "/var/www/frontend/dist/css/" "s3://fanse-bucket/media/static/live/css/"
