#!/bin/bash

# Check if two parameters are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 BASE_PATH MODEL_PATH"
    exit 1
fi

# Define the base directory
BASE_PATH=$1

# Get the model path from the command-line arguments
MODEL_PATH=$2

# Activate the virtual environment
source "${BASE_PATH}/virtenv/bin/activate"

# Change to the directory where the script is located
cd "${BASE_PATH}/training"

# Start the evaluation in the background, redirecting stdout and stderr to a log file
nohup python3 evaluate.py "${MODEL_PATH}" > "${BASE_PATH}/last_evaluation.log" 2>&1 &
