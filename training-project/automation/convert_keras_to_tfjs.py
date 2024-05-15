import os
import sys
from tensorflow import keras
import tensorflowjs as tfjs
sys.path.append("..")
sys.path.append(os.getcwd())
from helpers.custom_metrics import F1Score

def convert_keras_to_tfjs(input_file, output_path):
    # Load the Keras model
    model = keras.models.load_model(input_file, custom_objects={'F1Score': F1Score})

    # Convert the model to TensorFlow.js Layers format
    tfjs.converters.save_keras_model(model, output_path)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_file.keras> <output_path>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_path = sys.argv[2]

    convert_keras_to_tfjs(input_file, output_path)

