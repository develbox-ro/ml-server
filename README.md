# Machine Learning Server Training tools

# Tools 
- clip-server \- Simple flask server with `/predict` endpoint returns the prediction from CLIP
- tfjs-fileserver \- Builtin `python3 -m http.server` for serving models converted to tfjs format for use in js(AdCognition)
- models-fileserver \- Builtin `python3 -m http.server` for serving models trained
- control-panel \- Simple frontend for controlling the mlserver hyperparams, logs, training, converting, testing the models
- tensorboard \- Tensorboard for a more detailed information about the training process

## Ports to expose for each tool
- clip-server \- `5000`
- tfjs-fileserver \- `5500`
- models-fileserver \- `8080`
- control-panel \- `8888`
- tensorboard \- `6006`