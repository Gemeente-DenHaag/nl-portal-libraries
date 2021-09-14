#!/bin/sh
# touch /tmp/my.js
configfile="/usr/share/nginx/html/config.js"
echo "Start replacing env vars in $configfile"
# mv /usr/share/nginx/html/config.js /tmp/build/config.js

if [ ! -z "$KEYCLOAK_URL" ]; then
    # KEYCLOAK_URL=$(printf '%s\n' "$KEYCLOAK_URL" | sed 's|/|\\/|g')
    echo "Set KEYCLOAK_URL to $KEYCLOAK_URL"
    # sed -r "s|(KEYCLOAK_URL = ').*(')|\1$KEYCLOAK_URL\2|g" /usr/share/nginx/html/config.js > /tmp/my.js && cat /tmp/my.js > /usr/share/nginx/html/config.js
    # sed -i -r "s|(KEYCLOAK_URL = ').*(')|\1$KEYCLOAK_URL\2|g" /tmp/build/config.js
    sed -i -r "s|(KEYCLOAK_URL = ').*(')|\1$KEYCLOAK_URL\2|g" $configfile
fi

if [ ! -z "$KEYCLOAK_REALM" ]; then
    echo "Set KEYCLOAK_REALM to $KEYCLOAK_REALM"
    # sed -r "s|(KEYCLOAK_REALM = ').*(')|\1$KEYCLOAK_REALM\2|g" /usr/share/nginx/html/config.js > /tmp/my.js && cat /tmp/my.js > /usr/share/nginx/html/config.js
    # sed -i -r "s|(KEYCLOAK_REALM = ').*(')|\1$KEYCLOAK_REALM\2|g" /tmp/build/config/js
    sed -i -r "s|(KEYCLOAK_REALM = ').*(')|\1$KEYCLOAK_REALM\2|g" $configfile
fi

if [ ! -z "$KEYCLOAK_CLIENT_ID" ]; then
    echo "Set KEYCLOAK_CLIENT_ID to $KEYCLOAK_CLIENT_ID"
    # sed -r "s|(KEYCLOAK_CLIENT_ID = ').*(')|\1$KEYCLOAK_CLIENT_ID\2|g" /usr/share/nginx/html/config.js > /tmp/my.js && cat /tmp/my.js > /usr/share/nginx/html/config.js
    # sed -i -r "s|(KEYCLOAK_CLIENT_ID = ').*(')|\1$KEYCLOAK_CLIENT_ID\2|g" /tmp/build/config.js
    sed -i -r "s|(KEYCLOAK_CLIENT_ID = ').*(')|\1$KEYCLOAK_CLIENT_ID\2|g" $configfile
fi

if [ ! -z "$KEYCLOAK_REDIRECT_URI" ]; then
    # KEYCLOAK_REDIRECT_URI=$(printf '%s\n' "$KEYCLOAK_REDIRECT_URI" | sed 's|/|\\/|g')
    echo "Set KEYCLOAK_REDIRECT_URI to $KEYCLOAK_REDIRECT_URI"
    # sed -r "s|(KEYCLOAK_REDIRECT_URI = ').*(')|\1$KEYCLOAK_REDIRECT_URI\2|g" /usr/share/nginx/html/config.js > /tmp/my.js && cat /tmp/my.js > /usr/share/nginx/html/config.js
    # sed -i -r "s|(KEYCLOAK_REDIRECT_URI = ').*(')|\1$KEYCLOAK_REDIRECT_URI\2|g" /tmp/build/config.js
    sed -i -r "s|(KEYCLOAK_REDIRECT_URI = ').*(')|\1$KEYCLOAK_REDIRECT_URI\2|g" $configfile
fi

# mv /tmp/config.js /usr/share/nginx/html/config.js
# uncomment below for debugging
cat $configfile

echo "Done replacing env vars in $configfile"