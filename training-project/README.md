# ENV VARS
### These should be set in the `.env` file for convenience
- BASE_PATH \- Absolute path to the training-project folder
- MODELS_PATH \- Absolute path the location you want to store the models trained
### The other configuration can be set as env variables but is better to set them in the `config.json` file
### Here are some of the other configurations
- IMAGE_SIZE \- The size of the image sides in pixels
- AD_IMAGE_LIMIT \- Limit the number of images for AD class
- NONAD_IMAGE_LIMIT \- Limit the number of images for NONAD class
- BATCH_SIZE \- The number of images per one batch
- EPOCHS \- Number of iterations on all batches
- PATIENCE \- How many epochs to wait with no improvement until stop
- DATASET_PATH \- Where is the dataset located
- VERBOSE_LEVEL \- Verbosity level
# There are other servers
- TensorflowJS file server \- `python3 -m http.server $TFJS_MODELS_PATH`
- CLIP server \- `python3 $(echo "$CLIP_SERVER_PATH/")`
# Server setup

1. Check if NVIDIA driver is installed :
```bash
nvidia-smi
```
2. Upgrade pip
```bash
pip install --upgrade pip
```
3. Install latest virtual environment package for you python version
ex.
```bash
sudo apt install python3.10-venv
```
4. Create and activate python venv
```bash
python3.10 -m venv /path/to/venv
source /path/to/venv/bin/activate
```
5. Install tensorflow and cuda for GPU support
```bash
pip install tensorflow[and-cuda]
```
6. Verify the installation
```bash
python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```
