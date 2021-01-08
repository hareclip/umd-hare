<template>
    <page-wrapper>
        <auth-form v-model="auth" url="admin/auth" v-if="!auth.accepted"></auth-form>
        <div v-if="auth.accepted">
            <h1>Create Staff User</h1>
            <hr/>
            <div class="grid">
                <div class="label">New username:</div>
                <b-form-input v-model="newUser" @update="newUserState = null" :state="newUserState" placeholder="Enter a new username..." class="left-right-input"></b-form-input>
                <div class="label">New password:</div>
                <b-form-input v-model="newPassword" @update="newUserState = null" :state="newUserState" placeholder="Enter a password..." type="password" class="left-right-input"></b-form-input>
                <b-button @click="createUser" class="end-input">Create</b-button>
            </div>
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/PageWrapper'
import AuthForm from '@/components/AuthForm'

export default {
    name: 'CreateUser',
    components: {
        PageWrapper,
        AuthForm,
    },
    data () {
        return {
            auth: {},
            newUser: '',
            newPassword: '',
            newUserState: null,
        }
    },
    methods: {
        async load () {

        },

        async createUser() {
            if(this.newUser === '' || this.newPassword === '') {
                this.newUserState = false
                return
            }

            try {
                await this.$http.post('admin/create-user', {
                    username: this.auth.username,
                    password: this.auth.password,
                    newUsername: this.newUser,
                    newPassword: this.newPassword,
                    newRole: 2
                })
            } catch(e) {
                this.newUserState = false
                this.newUser = ''
                this.newPassword = ''
                return
            }

            this.newUserState = true
            this.newUser = ''
            this.newPassword = ''
        },
    },
    mounted () {
        this.load()
    },
}
</script>

<style scoped>
    .grid {
        width: 50rem;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: 20% 35% 30% 15%;
        grid-template-rows: repeat(4, 2.5rem) 9rem repeat(4, 2.5rem);
        grid-auto-flow: row;
        justify-items: stretch;
        align-items: stretch;
    }
    .label {
        grid-column: 1 / 2;
        padding-right: 1rem;
        justify-self: right;
        align-self: center;
    }
    .left-right-input {
        grid-column: 2 / 4;
    }
    .end-input {
        grid-column: 4 / 5;
        margin-left: 1em;
    }
</style>