class ClientApi {

    API_BASE_URL = "/api/v1"

    static requestHeaders() {
        return {};
    }

    static getAllClients() {
        const headers = this.requestHeaders();
        const request = new Request("/api/v1/clients", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        })
    }
    static putClient(client) {
        const request = new Request("/api/v1/clients", {
            method: 'PUT',
            headers: client
        });

        return fetch(request).then(response => {
            return response.json();
        })
    }
    static postClient(client) {
        const request = new Request("/api/v1/clients", {
            method: 'POST',
            headers: client
        });

        return fetch(request).then(response => {
            return response.json();
        })
    }
    static deleteClient(client) {
        const request = new Request("/api/v1/clients", {
            method: 'DELETE',
            headers: client
        });

        return fetch(request).then(response => {
            return response.json();
        })
    }
}

export default ClientApi