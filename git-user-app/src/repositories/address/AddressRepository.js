import axios from 'axios'

export default {
    findAddress(zipcode){
        return axios.get(`https://viacep.com.br/ws/${zipcode}/json/`)
    }
}
