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
                                item: resp[item].items,
                                isOpen: false
                            }
                            ctx.commit('updateSchedule', { type: 'schedules', data: tempWeek });
                            // ctx.commit('addSchedule', { type: 'schedules', data: tempWeek });
                        } else {
                            tempWeek = {
                                name: resp[item].name,
                                item: resp[item].items,
                                isOpen: false
                            }
                            ctx.commit('updateSchedule', { type: 'schedules', data: tempWeek });
                        }
                    }
                })
        }
    },
    mutations: {
        // addSchedule(state, { type, data }) {
        //     state[type].push(data)

        // },
        updateSchedule(state, { type, data }) {
            
            data.item = mergeCoincidences(createScheduleOfWeek(data.item), data)
            state[type].push(data)
            
            function createScheduleOfWeek(week) {
                let result = [];
                let tempDay = {};
                for (let item = 0, count = 1; week && item < week.length; item++) {
                    if (week[item].dayOfWeek == count) {
                        // let day = this.dayOfIndex[count];
                        if (week[item].startAt == '00:00' && week[item].endAt == '23:59') {
                            tempDay = {
                                day: week[item].dayOfWeek == 7 ? 0 : week[item].dayOfWeek,
                                time: 'круглосуточно',
                                isOpen: checkIsOpen(week[item])
                            }
                            result.push(tempDay);
                        } else {
                            tempDay = {
                                day: week[item].dayOfWeek == 7 ? 0 : week[item].dayOfWeek,
                                time: `${week[item].startAt}-${week[item].endAt}`,
                                isOpen: checkIsOpen(week[item])
                            }
                            result.push(tempDay)
                        }
                        count++
                    } else {
                        tempDay = {
                            day: count == 7 ? 0 : count,
                            time: 'Выходной',
                            isOpen: false
                        }
                        result.push(tempDay)
                        count++;
                        item--;
                    }
                }
                if (result.length != 7) {
                    for (let item = 1; 7 - result.length > 0;) {
                        result.push({
                            day: result.length + item == 7  ? 0 : result.length + item,
                            time: 'Выходной',
                            isOpen: false
                        })
                    }
                }
                return result
            }

            function mergeCoincidences(week, data) {
                let result = [];
                let isOpen = false;
                for (let i = 0; week && week.length != 0;) {
                    let pattern = week[i].time;
                    let arr = [];
                    for (let j = 0; j < week.length; j++) {
                        if (week[i].isOpen) isOpen = true;
                        if (week[j].time == pattern) {
                            arr.push(week[j].day);
                            week.splice(j, 1);
                            j--;
                        }
                    }
                    result.push({
                        day: arr,
                        time: pattern,
                    })
                    data.isOpen = isOpen
                }
                return result
            }

            function checkIsOpen(day) {
                let now = getNowDate();
                let [hStart, mStart] = day.startAt.split(':');
                let [hEnd, mEnd] = day.endAt.split(':');
                if (day.dayOfWeek == now.day && (now.h < hEnd && now.h > hStart) && (now.m < mEnd && now.m > mStart)) {
                    return true
                }
                return false
            }
            function getNowDate() {
                let date = new Date();
                let day = date.getDay();
                let h = date.getHours();
                let m = date.getMinutes();
                return { day, h, m }
            }
        }
    },
    getters: {
        getSchedules: state => state.schedules,
    },
    
});