python3 -m venv penv
source penv/bin/activate
pip3 install -r requirements.txt
export PORT=8888
nohup python3 server.py &
