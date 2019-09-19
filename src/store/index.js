import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        schedules: [],
        data: null
    },
    actions: {
        getScheduleRequest(ctx, slug) {
            axios
                .get(`https://tabler.ru/api/v1/places/${slug}`)
                .then(response => {
                    // ctx.commit('updateObj', { type: 'schedules', data: response.data.data.place.schedules });
                    // console.log(response.data.data.place.schedules)
                    let resp = response.data.data.place.schedules;
                    let tempWeek = {}
                    for (let item in resp) {
                        if (resp[item].isMain) {
                            tempWeek = {
                                name: 'Часы работы',
                                item: resp[item].items
                            }
                            ctx.commit('addSchedule', { type: 'schedules', data: tempWeek });
                        } else {
                            tempWeek = {
                                name: resp[item].name,
                                item: resp[item].items
                            }
                            ctx.commit('addSchedule', { type: 'schedules', data: tempWeek });
                        }
                    }
                })
        }
    },
    mutations: {
        addSchedule(state, { type, data }) {
            state[type].push(data)
        }
    },
    getters: {
        getSchedules: state => state.schedules,
    },
    
});