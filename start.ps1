$env:FLASK_DEBUG=0
$env:FLASK_APP="server:create_server"

if ([bool](Get-job -Name GreenRockFlask -ErrorAction SilentlyContinue)){
    Get-Job -Name GreenRockFlask | Stop-Job
    Get-Job -Name GreenRockFlask | Remove-Job
}

Start-Job -Name GreenRockFlask -ScriptBlock {
    flask run --host=localhost --port=5000
}
