python3 -m venv penv
source penv/bin/activate
pip3 install -r requirements.txt
export PORT=5000
nohup python3 clip_backend.py &
