#!/bin/bash

# Directory containing the JavaScript files
directory='./src'

# Regex pattern to match JavaScript import statements that don't include ".js" at the end of the source path
pattern="from ['\"](.+/[^'\"]*?)['\"]"

# Replacement pattern that adds ".js"
replacement="from \"\1.js\""

# Find all .js files in the directory and its subdirectories
find "$directory" -type f -name '*.js' -print0 |
while IFS= read -r -d '' file; do
    sed -i -E "s#$pattern#$replacement#g" "$file"
done

echo "Imports updated."
