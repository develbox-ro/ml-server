#!/usr/bin/zsh

# Check if three parameters are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 BASE_PATH MODEL_PATH TFJS_SERVER_PATH"
    exit 1
fi

# Define the base directory
BASE_PATH=$1

# Get the model path from the command-line arguments
MODEL_PATH=$2

TFJS_SERVER_PATH=$3

# Extract the model folder name and the model file name from the model path
MODEL_FOLDER_NAME=$(basename "$(dirname "$(dirname "$MODEL_PATH")")")
MODEL_FILE_NAME=$(basename "$MODEL_PATH" .keras)  # Remove the extension

# Define the output directory
OUTPUT_PATH="${TFJS_SERVER_PATH}/${MODEL_FOLDER_NAME}${MODEL_FILE_NAME}"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_PATH"

# Change to the directory where the script is located
cd "${BASE_PATH}/automation"

source ../virtenv/bin/activate

# Start the evaluation in the background, redirecting stdout and stderr to a log file
nohup python3 convert_keras_to_tfjs.py "$MODEL_PATH" "$OUTPUT_PATH" > convert.log 2>&1 &
