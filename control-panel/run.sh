#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d "penv" ]
then
    python3 -m venv penv
    source penv/bin/activate
    pip3 install -r requirements.txt
else
    source penv/bin/activate
fi

nohup python3 control-panel.py &

