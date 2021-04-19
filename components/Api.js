export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Pronise.reject(new Error(`Ошибка ${res.status}`))
    }
    getTasks(url) {
        return fetch(`${this.url}/${url}`, {
            headers: this.headers,
        })
            .then(this._checkResponse)
    }
    createTask(card, url) {
        return fetch(`${this.url}/${url}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(this._checkResponse)
    }
    putTask(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }

    deleteTask(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }
    updateTask(object, url) {
        return fetch(`${this.url}/${url}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(this._checkResponse)
        // .catch(err => Promise.reject(err))
    }
}