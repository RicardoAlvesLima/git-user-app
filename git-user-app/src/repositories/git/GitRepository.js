import axios from 'axios'

const resource = 'https://api.github.com'

export default {
    findUser(gitUser) {
        return axios.get(`${resource}/search/users?q=${gitUser}`)
    },
    followers(gitUser) {
        return axios.get(`${resource}/users/${gitUser}/followers?per_page=100`)
    },
    following(gitUser) {
        return axios.get(`${resource}/users/${gitUser}/following?per_page=100`)
    },
    repositories(gitUser) {
        return axios.get(`${resource}/users/${gitUser}/repos?per_page=100`)
    },
}
