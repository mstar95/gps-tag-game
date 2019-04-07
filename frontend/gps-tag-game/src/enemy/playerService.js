let clientWebSocket

export function getClient(onMessage) {
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
    clientWebSocket.onmessage = function (data) {
      //  console.log("clientWebSocket.onmessage", clientWebSocket, data);
        onMessage(JSON.parse(data.data))
    }

    return {sendLocation}
}

function sendLocation(player) {
    clientWebSocket.send(JSON.stringify(player))
}