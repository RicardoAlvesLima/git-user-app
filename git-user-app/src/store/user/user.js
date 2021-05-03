import UserRepository from '../../repositories/user/UserRepository'
import GitRepository from "../../repositories/git/GitRepository";

const state = () => ({
    users: [],
})

const getters = {}

const actions = {
    async listAll({commit}) {
        UserRepository.listAll().then((resp) => {
            commit('setUsers', resp.data)
        })
    },
    create({dispatch}, data) {
        return UserRepository.create(data).then(() => {
            dispatch('listAll')
        })
    },
    update({dispatch}, data) {
        return UserRepository.update(data).then(() => {
            dispatch('listAll')
        })
    },
    delete({dispatch}, userId) {
        return UserRepository.delete(userId).then(() => {
            dispatch('listAll')
        })
    },
}

const mutations = {
    setUsers(state, data) {
        data.forEach((u) => {
            GitRepository.followers(u.git.login).then((result) => {
                u.followers = result.data.length
            })
        })
        data.forEach((u) => {
            GitRepository.following(u.git.login).then((result) => {
                u.following = result.data.length
            })
        })
        setTimeout(() => {
            state.users = data
        }, 200);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
