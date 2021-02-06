export FLASK_DEBUG=0
export FLASK_APP=server:create_server

flask run --host=localhost --port=5000 &

python -mwebbrowser http://localhost:5000/ &
wait
