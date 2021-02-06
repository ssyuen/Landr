export FLASK_DEBUG=1
export FLASK_APP=server:create_server

flask run --host=localhost --port=12000 &

python -mwebbrowser http://localhost:12000/ &
wait