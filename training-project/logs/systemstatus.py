import time
import psutil
import logging

def log_system_resources(interval=1):
    while True:
        # Get current CPU usage
        cpu_usage = psutil.cpu_percent()
        logging.info(f'CPU usage: {cpu_usage}%')

        # Get current RAM usage
        ram_usage = psutil.virtual_memory().percent
        logging.info(f'RAM usage: {ram_usage}%')

        # Sleep for the specified interval
        time.sleep(interval)

