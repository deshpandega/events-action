#!/bin/bash

# Zip the contents of this folder
# These are files that we want to include authentication-action.js package.json package-lock.json node_modules
# exclude all '.sh' files and all '.zip' files while zipping
zip -r event.zip * -x "*.zip" -x "*.sh" -x "*.md"


# Create package
wsk -i package update hobbylocale

# Create / Update action
wsk -i action update guest/hobbylocale/postEvent event.zip --kind nodejs:6 --web true --param-file config.json --main=postEvent

wsk -i action update guest/hobbylocale/getEvents event.zip --kind nodejs:6 --web true --param-file config.json --main=getEvents

# Get url of actions
wsk -i action get guest/hobbylocale/postEvent --url
wsk -i action get guest/hobbylocale/getEvents --url