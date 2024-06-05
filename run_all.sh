cd "$(dirname "$0")"

./run_models_fileserver.sh /mnt/data/mlserver/cnn_training/models
./run_tfjs_fileserver.sh /mnt/data/mlserver/adblock/pyton/flask_backend/model_server
./clip-server/run.sh
./control-panel/run.sh
