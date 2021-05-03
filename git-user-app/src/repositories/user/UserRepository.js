import axios from 'axios'

const resource = 'http://localhost:3000/users'

export default {
    listAll() {
        return axios.get(`${resource}`)
    },
    create(data) {
        return axios.post(`${resource}`, data)
    },
    update(data) {
        return axios.put(`${resource}`, data)
    },
    delete(userId) {
        return axios.delete(`${resource}/${userId}`)
    },
}
