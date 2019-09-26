<template lang="pug">
    #app.container.mt-5
        .row
            .col
                .form-group
                    label(for="input-text") Слаг заведения
                    input.input-search.form-control#input-text(
                        type="text"
                        placeholder="Введите название заведения..."
                        v-model="requestSlag"
                        )
                button.base.btn(@click="getScheduleRequest(requestSlag)")
                    | Обновить
        .row.mt-5
            .col
                schedule-component


</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Schedule from './Schedule.vue'

export default {
    name: 'app',
    data () {
        return {
            requestSlag: 'cubalibrespb',
        }
    },
    components: {
        'schedule-component': Schedule
    },
    computed: {
        ...mapGetters(["getSchedules"]),
    },
    methods: {
        ...mapActions(["getScheduleRequest"]),
    }
}
</script>

<style lang="stylus" scoped>

</style>
