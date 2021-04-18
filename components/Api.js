export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }
    getTasks() {
        return fetch(this.url, {
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Pronise.reject(new Error(`Ошибка ${res.status}`))
            })
            .catch(err => Promise.reject(err))

    }
    createTask(card) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Pronise.reject(new Error(`Ошибка ${res.status}`))
            })
            .catch(err => Promise.reject(err))
    }
    putTask(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Pronise.reject(new Error(`Ошибка ${res.status}`))
            })
            .catch(err => Promise.reject(err))
    }

    deleteTask(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Pronise.reject(new Error(`Ошибка ${res.status}`))
            })
            .catch(err => Promise.reject(err))
    }
    updateTask(object, url) {
        return fetch(`${this.url}/${url}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(object)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Pronise.reject(new Error(`Ошибка ${res.status}`))
            })
            .catch(err => Promise.reject(err))
    }
}