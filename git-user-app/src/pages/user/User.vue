<template>
  <div class="p-5">
    <vs-button
        class="hover:shadow-md text-sm font-bold"
        flat
        active
        @click="createUser"
        size=""
    >
      <icon name="plus" white/>
      Add Github user
    </vs-button>
    <div id="page-login" class="h-full w-full flex py-5">
      <div v-for="user in users" :key="user.id">
        <vs-card class="pr-4 pb-4 w-64" type="1">
          <template #title>
            <h3>{{ user.name }}, {{ user.age }}</h3>
          </template>
          <template #img>
            <img :src="user.git.avatar_url" alt="">
          </template>
          <template #text>
            <vs-button flat color="#fff" transparent>
              <icon size="20px" name='user'/>
              <span class="text-black pl-1">
                {{ user.followers }} Followers
              </span>
            </vs-button>
            <vs-button flat color="#fff" transparent>
              <icon size="20px" name='user'/>
              <span class="text-black pl-1">
                {{ user.following }} Following
              </span>
            </vs-button>
            <p>
            </p>
          </template>
          <template #interactions>
            <div class="flex flex-row space-x-1">
              <vs-button shadow icon @click="editUser(user)">
                <icon size="16px" name='edit'/>
              </vs-button>
              <vs-button danger icon @click="deleteUser(user.id)">
                <icon size="16px" white name='trash'/>
              </vs-button>
            </div>
          </template>
        </vs-card>
      </div>
    </div>
    <vs-dialog
        v-model="showDialog"
        v-on:close="closeModal"
    >
      <template #header>
        <h4 class="not-margin">
          {{ action === 'Create' ? 'Add User' : 'Edit User' }}
        </h4>
      </template>

      <div class="p-10 max-w-md">
        <div class="pb-5">
          Person
          <div class="p-2">
            <vs-input primary state="dark" class="mt-2" placeholder="Name" v-model="user.name"/>
            <vs-input primary state="dark" class="mt-2" placeholder="Age" v-model="user.age"/>
          </div>
        </div>
        <div>
          Address
          <div class="p-2">
            <vs-input
                primary
                state="dark"
                class="mt-2"
                placeholder="Zipcode"
                v-model="user.address.zipcode"
                v-on:keypress="formatZipcode"
                v-on:blur="findAddress"
            />
            <vs-input primary state="dark" class="mt-2" placeholder="Street" v-model="user.address.street"/>
            <vs-input primary state="dark" class="mt-2" placeholder="Neighborhood"
                      v-model="user.address.neighborhood"/>
            <vs-input primary state="dark" class="mt-2" placeholder="City" v-model="user.address.city"/>
            <vs-input primary state="dark" class="mt-2" placeholder="State" v-model="user.address.state"/>
          </div>
        </div>
        <div>
          Github
          <div class="p-2">
            <vs-input
                primary
                state="dark"
                class="mt-2"
                placeholder="Github User"
                v-model="user.git.login"
                v-on:blur="findGitUser"
            />
          </div>
        </div>
        <vs-button
            class="mt-5 w-full hover:shadow-md font-bold text-sm"
            flat
            active
            @click="save"
        >
          {{ action === 'Create' ? 'Add' : 'Save' }}
        </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {notifyError, notifySuccess} from "../../util/notification.utils";
import AddressRepository from "../../repositories/address/AddressRepository";
import GitRepository from "../../repositories/git/GitRepository";

export default {
  name: 'User',
  created() {
    this.$store.dispatch("user/listAll")
  },
  data: () => ({
    user: {
      id: null,
      name: '',
      age: '',
      address: {
        zipcode: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      git: {
        login: "",
        id: "",
        avatar_url: "",
        type: "",
        score: ""
      }
    },
    showDialog: false,
    action: '',
  }),
  computed: {
    ...mapState('user', [
      'users'
    ]),
  },
  methods: {
    createUser() {
      this.action = 'Create'
      this.showDialog = true
    },
    editUser(user) {
      this.action = 'Edit'
      this.user = user
      this.showDialog = true
    },
    closeModal() {
      this.showDialog = false
      this.user = {
        id: null,
        name: '',
        age: '',
        address: {
          zipcode: '',
          street: '',
          neighborhood: '',
          city: '',
          state: '',
        },
        git: {
          login: "",
          id: "",
          avatar_url: "",
          type: "",
          score: ""
        }
      }
    },
    formatZipcode(e) {
      if (e.target.value.length > 6) {
        const x = e.target.value.replace(/\D/g, '').match(/(\d{5})(\d{2})/)
        e.target.value = x[1] + '-' + x[2]
      }
    },
    async findAddress() {
      await AddressRepository.findAddress(this.user.address.zipcode).then((resp) => {
        this.user.address.street = resp.data.logradouro
        this.user.address.neighborhood = resp.data.bairro
        this.user.address.city = resp.data.localidade
        this.user.address.state = resp.data.uf
      })
    },
    async findGitUser() {
      await GitRepository.findUser(this.user.git.login).then((resp) => {
        if (resp.data.total_count > 0) {
          this.user.git.id = resp.data.items[0].id
          this.user.git.avatar_url = resp.data.items[0].avatar_url
          this.user.git.type = resp.data.items[0].type
          this.user.git.score = resp.data.items[0].score
        } else {
          notifyError(this, "User not found")
        }
      })
    },
    async save() {
      if (this.user.git.id) {
        if (this.action === 'Create') {
          await this.$store.dispatch('user/create', this.user)
              .then(() => {
                this.showDialog = false
                notifySuccess(this, "User created")
              })
        } else {
          await this.$store.dispatch('user/update', this.user)
              .then(() => {
                this.showDialog = false
                notifySuccess(this, "User updated")
              })
        }
      } else {
        notifyError(this, "Git user needed")
      }
    },
    async deleteUser(userId) {
      await this.$store.dispatch('user/delete', userId)
          .then(() => {
            notifySuccess(this, "User deleted")
          })
          .catch((err) => {
            notifyError(this, err)
          })
    },
  }
}
</script>
