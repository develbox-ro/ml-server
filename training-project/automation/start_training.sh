#!/bin/bash

# Check if a parameter is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 BASE_PATH"
    exit 1
fi

# Define the base directory
BASE_PATH=$1

# Activate the virtual environment
source "${BASE_PATH}/virtenv/bin/activate"

# Change to the directory where the script is located
cd "${BASE_PATH}/training"

# Start the training in the background, redirecting stdout and stderr to a log file
nohup python3 "${BASE_PATH}/training/resnet50_training.py" > "${BASE_PATH}/last_training.log" 2>&1 &
