export const getPlayers = () => Promise.resolve([{positionX: 20.993555, positionY: 52.210667},
    {positionX: 20.992381, positionY: 52.211590},
    {positionX: 20.991341, positionY: 52.210973}])

let clientWebSocket

export function getClient() {
    if (clientWebSocket) {
        return {sendLocation}
    }
    clientWebSocket = new WebSocket("ws://localhost:8080/position-update");
    clientWebSocket.onopen = function () {
        console.log("clientWebSocket.onopen", clientWebSocket);
        console.log("clientWebSocket.readyState", "websocketstatus");
    }
    clientWebSocket.onclose = function (error) {
        console.log("clientWebSocket.onclose", clientWebSocket, error);
    }
    clientWebSocket.onerror = function (error) {
        console.log("clientWebSocket.onerror", clientWebSocket, error);
    }
    clientWebSocket.onmessage = function (error) {
        console.log("clientWebSocket.onmessage", clientWebSocket, error);
    }

    function events(responseEvent) {
        document.querySelector(".events").innerHTML += responseEvent + "<br>";
    }

    return {sendLocation}
}

function sendLocation(player) {
    console.log(player)
    clientWebSocket.send(JSON.stringify(player))
}