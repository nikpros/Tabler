<template lang="pug">
    .card
        .card-body
            item-component(
                v-for="(schedule, index) in getSchedules"
                :key="index"
                :name="schedule.name"
                :item="schedule.item"
                :open="schedule.isOpen"
            )
                slot(v-if="index < getSchedules.length - 1")
                    hr
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import Item from './Item.vue'

export default {
    data () {
        return {
        }
    },
    components: {
        'item-component': Item
    },
    computed: {
        ...mapGetters(["getSchedules"])
    },
    methods: {
    }
}
</script>

<style lang="stylus" scoped>

</style>
