<template>
    <div className="w-96 mx-auto">
        <div>
            <input
                v-model="email"
                type="email"
                placeholder="email"
                className="w-96 p-1 mb-2 border border-inherit rounded-lg"
            />
        </div>
        <div>
            <input
                v-model="password"
                type="password"
                placeholder="password"
                className="w-96 p-1 mb-2 border border-inherit rounded-lg"
            />
        </div>
        <div>
            <input
                @click.prevent="login"
                type="submit"
                value="login"
                class="block float-right mx-auto w-32 p-1 bg-sky-400 text-white rounded-lg"
            />
        </div>
    </div>
</template>

<script>
import { getCookie } from "../../utils/cookies.js";

export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,
        };
    },

    methods: {
        login() {
            axios.get("/sanctum/csrf-cookie").then(() => {
                axios
                    .post("/login", {
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        localStorage.setItem(
                            "x_xsrf_token",
                            getCookie("XSRF-TOKEN"),
                        );
                        this.$router.push({ name: "user.personal" });
                    })
                    .catch((err) => {});
            });
        },
    },
};
</script>

<style scoped></style>
