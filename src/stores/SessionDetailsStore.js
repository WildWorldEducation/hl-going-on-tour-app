import { defineStore } from 'pinia'

export const useSessionDetailsStore = defineStore("sessionDetails", {
    state: () => {
        return {
            isLoggedIn: null,
            userId: null,
            isAdmin: null
        }
    },
    actions: {
        async getSessionDetails() {
            const result = await fetch('/api/get-session-details');
            const data = await result.json();

            this.isLoggedIn = data.isLoggedIn;
            this.userId = data.userId;
            this.isAdmin = data.isAdmin;

            return this.$state;
        },
    }
});