import os
import sys
from tensorflow.keras.applications.mobilenet_v3 import MobileNetV3Large
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.metrics import Precision, Recall

sys.path.append("..")
sys.path.append(os.getcwd())
from helpers.custom_metrics import F1Score

def mobileNetV3Large(strategy):
    with strategy.scope():
        base_model = MobileNetV3Large(weights='imagenet', include_top=False)
        for layer in base_model.layers:
            layer.trainable = False

        x = GlobalAveragePooling2D()(base_model.output)
        x = Dense(1024, activation="relu")(x)
        x = Dropout(0.5)(x)  # Add dropout here
        predictions = Dense(1, activation="sigmoid")(x)
        model = Model(inputs=base_model.input, outputs=predictions)
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss="binary_crossentropy",
            metrics=["accuracy", Precision(), Recall(), F1Score()],
        )

        return model
