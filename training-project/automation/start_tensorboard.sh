#!/bin/bash

# Check if two parameters are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 MODELS_PATH LOGDIR"
    exit 1
fi

# Define the models directory
MODELS_PATH=$1

# Get the log directory from the command-line arguments
LOGDIR=$2

# Activate the virtual environment
source "${MODELS_PATH}/virtenv/bin/activate"

# Extract the model folder name from the log directory
MODEL_FOLDER_NAME=$(basename "$(dirname "$LOGDIR")")

nohup tensorboard --logdir $LOGDIR --host 0.0.0.0 > "${MODELS_PATH}/$MODEL_FOLDER_NAME/tensorboard.log" 2>&1 &
