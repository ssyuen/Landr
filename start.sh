export FLASK_DEBUG=0
export FLASK_APP=server:create_server

flask run --host=10.150.0.2 --port=5000 &

python -mwebbrowser http://localhost:5000/ &
wait
