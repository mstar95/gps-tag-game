let clientWebSocket

export function getBerekClient(onMessage) {
    if (clientWebSocket) {
        return {catchBerek}
    }
    clientWebSocket = new WebSocket("ws://localhost:8080/chujxD");
    clientWebSocket.onopen = function () {
        console.log("berek.onopen", clientWebSocket);
        console.log("berek.readyState", "websocketstatus");
    }
    clientWebSocket.onclose = function (error) {
        console.log("berek.onclose", clientWebSocket, error);
    }
    clientWebSocket.onerror = function (error) {
        console.log("berek.onerror", clientWebSocket, error);
    }
    clientWebSocket.onmessage = function (data) {
        console.log("berek.onmessage", clientWebSocket, data);
        onMessage(JSON.parse(data.data))
    }

    return {catchBerek}
}

function catchBerek(data) {
    clientWebSocket.send(JSON.stringify(data))
}