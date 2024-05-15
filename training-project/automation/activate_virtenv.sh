#!/usr/bin/zsh
# Check if the virtual environment is activated
if [[ "$VIRTUAL_ENV" != "" ]] && [[ $(basename "$VIRTUAL_ENV") = "virtenv" ]]
then
  echo "Already in the 'virtenv' virtual environment."
else
  source ../virtenv/bin/activate

  if [[ $? = 0 ]]
  then
    echo "Successfully activated the 'virtenv' virtual environment."
  else
    echo "Failed to activate the 'virtenv' virtual environment. Please make sure it exists and try again."
  fi
fi

