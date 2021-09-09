#!/bin/sh
ls -al /usr/share/nginx/html
if [ ! -z "$KEYCLOAK_URL" ]; then
    echo "Set KEYCLOAK_URL to $KEYCLOAK_URL"
    sed -i "s/\(KEYCLOAK_URL = '\).*\('\)/\1$KEYCLOAK_URL\2/g" /usr/share/nginx/html/config.js
fi
if [ ! -z "$KEYCLOAK_REALM" ]; then
    echo "Set KEYCLOAK_REALM to $KEYCLOAK_REALM"
    sed -i "s/\(KEYCLOAK_REALM = '\).*\('\)/\1$KEYCLOAK_REALM\2/g" /usr/share/nginx/html/config.js
fi
if [ ! -z "$KEYCLOAK_CLIENT_ID" ]; then
    echo "Set KEYCLOAK_CLIENT_ID to $KEYCLOAK_CLIENT_ID"
    sed -i "s/\(KEYCLOAK_CLIENT_ID = '\).*\('\)/\1$KEYCLOAK_CLIENT_ID\2/g" /usr/share/nginx/html/config.js
fi
if [ ! -z "$KEYCLOAK_REDIRECT_URI" ]; then
    echo "Set KEYCLOAK_REDIRECT_URI to $KEYCLOAK_REDIRECT_URI"
    sed -i "s/\(KEYCLOAK_REDIRECT_URI = '\).*\('\)/\1$KEYCLOAK_REDIRECT_URI\2/g" /usr/share/nginx/html/config.js
fi