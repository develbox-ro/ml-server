#!/bin/bash

# Check if two parameters are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 BASE_PATH MODELS_PATH LOGDIR"
    exit 1
fi

# Define the models directory
MODELS_PATH=$1

# Define the models directory
MODELS_PATH=$2

# Get the log directory from the command-line arguments
LOGDIR=$3 

# Activate the virtual environment
source "$BASE_PATH/virtenv/bin/activate"

# Extract the model folder name from the log directory
MODEL_FOLDER_NAME=$(basename "$(dirname "$LOGDIR")")

nohup tensorboard --logdir "$MODELS_PATH/$LOGDIR" --bind_all --port 6006 > "$MODELS_PATH/$MODEL_FOLDER_NAME/tensorboard.log" 2>&1 &
