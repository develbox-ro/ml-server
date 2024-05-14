# Flask backend for the control panel
This is a simple REST API Flask server with some endpoints for controlling the machine learning server

## Environment Variables
- `TRAINING_PROJECT_PATH` \- Path to the training project folder

## API
### Processes
- `GET /processes` \- Get all `python3` running processes 
- `POST /stop_process/{id}` \- Stop the process with the `id` passed

### Training
- `POST /start_training` \- Start model training with current set hyperparameters

### Testing
- `POST /start_testing` \- Start last trained model testing with current set hyperparameters
    - `BODY: {model: string}` model_path to be tested

### Logging
- `GET /get_logs` \- Get the training logs of the current running training
- `GET /get_evaluation_logs` \- Get the evaluation logs of the current running training 
- `POST /start_tensorboard` \- Start tensorboard 
    - `BODY: {logdir: string}` directory with logs

### Hyperparameters
- `GET /hyperparameters` \- Get all hyperparameters, current training parameters
- `POST /update_config` \- Update the new config
    - `BODY: {config}`

### Models
- `GET /get_models` \- Get list of all trained models

### Other 
- `POST /convert` \- Convert the last trained model to TFJS
    - `BODY: {model: string}` model_path to be converted
