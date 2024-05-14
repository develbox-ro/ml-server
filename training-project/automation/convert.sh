#!/bin/bash

# Check if three parameters are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 BASE_PATH MODEL_PATH OUTPUT_PATH"
    exit 1
fi

# Define the base directory
BASE_PATH=$1

# Get the model path from the command-line arguments
MODEL_PATH=$2

# Define the output directory
OUTPUT_PATH=$3

# Activate the virtual environment
source "${BASE_PATH}/virtenv/bin/activate"

# Extract the model folder name and the model file name from the model path
MODEL_FOLDER_NAME=$(basename "$(dirname "$(dirname "$MODEL_PATH")")")
MODEL_FILE_NAME=$(basename "$MODEL_PATH" .h5)  # Remove the .h5 extension

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_PATH"

# Change to the directory where the script is located
cd "${BASE_PATH}/automation"

# Start the evaluation in the background, redirecting stdout and stderr to a log file
nohup tensorflowjs_converter --input_format=keras "$MODEL_PATH" "$OUTPUT_PATH" > convert.log 2>&1 &
