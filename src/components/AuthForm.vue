<template>
    <div>
        <b-row class="mb-3">
            <b-col sm="3">
                <label for="username">Username:</label>
            </b-col>
            <b-col sm="9">
                <b-form-input v-model="auth.username" @input="resetAccepted" id="username"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="mb-3">
            <b-col sm="3">
                <label for="password">Password:</label>
            </b-col>
            <b-col sm="9">
                <b-form-input v-model="auth.password" @input="resetAccepted" id="password" type="password" :state="auth.accepted"></b-form-input>
            </b-col>
        </b-row>
        <b-button @click="login">Login</b-button>
    </div>
</template>

<script>
export default {
    name: 'AuthForm',
    props: ['value', 'url'],
    data () {
        return {
            auth: {
                username: '',
                password: '',
                accepted: null,
            }
        }
    },
    methods: {
        async login () {
            try {
                const res = await this.$http.post(this.url, {
                    username: this.auth.username,
                    password: this.auth.password,
                })
                this.auth.accepted = true
            } catch(e) {
                this.auth.accepted = false
            }
            this.$emit('input', this.auth)
        },
        resetAccepted () {
            this.auth.accepted = null
        },
    },
    watch: {
        value (newVal, oldVal) {
            if(typeof newVal === 'object' && newVal !== null) {
                this.auth = newVal
            }
        },
    }
}
</script>

<style>

</style>