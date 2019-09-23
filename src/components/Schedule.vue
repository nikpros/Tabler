<template lang="pug">
    .card
        .card-body
            item-component(
                v-for="(schedule, index) in getSchedules"
                :key="index"
                :name="schedule.name"
                :item="schedule.item"
            )
            hr
            pre {{ getSchedules[1].item }}



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
