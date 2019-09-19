<template lang="pug">
    .container.mt-5
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
        .row
            .col
                schedule-component(v-if="getSchedules")


</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Schedule from './Schedule.vue'

export default {
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
