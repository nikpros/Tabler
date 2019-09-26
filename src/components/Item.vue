<template lang="pug">
    .container
        .row
            .col.d-flex
                h4.title {{ name }}
                template(v-if="isMain")
                    h4.ml-3.muted(
                        :class="{ open: open }"
                    ) {{ worked }}
            template(v-if="!isMain")
                .col.text-right
                    p
                        font-awesome-icon.mr-2.marker(
                            icon="circle"
                            :class="{ open: open }"
                        )
                        | {{ worked }}
        template(
            v-for="(day, index) in item"
        )
            .row
                .col
                    p {{ _console(day.day) }}
                .col.text-right
                    p {{ day.time }}
        slot
</template>

<script>


export default {
    data () {
        return {
            dayOfIndex: ["Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            isMain: false,
            worked: null
        }
    },
    props: {
        name: String,
        item: Array,
        open: Boolean
    },
    computed: {

    },
    mounted() {
        this.name == 'Часы работы' ? this.isMain = true : this.isMain = false
        this.open ? this.worked = 'открыто' : this.worked = 'закрыто'
    },
    methods: {
        // createScheduleOfWeek(week) {
        //     let result = [];
        //     let tempDay = {};
        //     for (let item = 0, count = 1; week && item < week.length; item++) {
        //         if (week[item].dayOfWeek == count) {
        //             // let day = this.dayOfIndex[count];
        //             if (week[item].startAt == '00:00' && week[item].endAt == '23:59') {
        //                 tempDay = {
        //                     day: week[item].dayOfWeek == 7 ? 0 : week[item].dayOfWeek,
        //                     time: 'круглосуточно',
        //                     isOpen: this.checkIsOpen(week[item])
        //                 }
        //                 result.push(tempDay);
        //             } else {
        //                 tempDay = {
        //                     day: week[item].dayOfWeek == 7 ? 0 : week[item].dayOfWeek,
        //                     time: `${week[item].startAt}-${week[item].endAt}`,
        //                     isOpen: this.checkIsOpen(week[item])
        //                 }
        //                 result.push(tempDay)
        //             }
        //             count++
        //         } else {
        //             tempDay = {
        //                 day: count == 7 ? 0 : count,
        //                 time: 'Выходной',
        //                 isOpen: false
        //             }
        //             result.push(tempDay)
        //             count++;
        //             item--;
        //         }
        //     }
        //     if (result.length != 7) {
        //         for (let item = 1; 7 - result.length > 0;) {
        //             result.push({
        //                 day: result.length + item == 7  ? 0 : result.length + item,
        //                 time: 'Выходной',
        //                 isOpen: false
        //             })
        //         }
        //     }
        //     return result
        // },
        // mergeCoincidences(week) {
        //     let result = [];
        //     let isOpen = false;
        //     console.table(week)
        //     for (let i = 0; week && week.length != 0;) {
        //         let pattern = week[i].time;
        //         let arr = [];
        //         // console.log(week[i].isOpen)
                
                
        //         for (let j = 0; j < week.length; j++) {
        //             if (week[i].isOpen) isOpen = true;
        //             if (week[j].time == pattern) {
        //                 arr.push(week[j].day);
        //                 week.splice(j, 1);
        //                 j--;
        //             }
        //         }
        //         result.push({
        //             day: arr,
        //             time: pattern,
        //             isOpen
        //         })
        //     }
        //     console.table(result)
        //     return result
        // },
        _console(array) {
            let result = [];
            for (let i = 0, start = 0, count = 1; array && i < array.length; i++) {
                // array[i] = this.dayOfIndex[i+1];
                if (array[i+1] == array[i] + 1) count++;
                else {
                    switch (count) {
                        case 1: result.push(this.dayOfIndex[array[i]]);
                            break;
                        case 2: result.push(`${this.dayOfIndex[array[start]]}, ${this.dayOfIndex[array[i]]}`);
                            break;
                        default: result.push(`${this.dayOfIndex[array[start]]} - ${this.dayOfIndex[array[i]]}`);
                    }
                    start = i + 1;
                    count = 1;
                }
            }
            return result.join(', ');
        },
        // checkIsOpen(day) {
        //     // debugger
        //     let now = this.getNowDate();
        //     let [hStart, mStart] = day.startAt.split(':');
        //     let [hEnd, mEnd] = day.endAt.split(':');
        //     if (day.dayOfWeek == now.day && (now.h < hEnd && now.h > hStart) && (now.m < mEnd && now.m > mStart)) {
        //         return true
        //     }
        //     return false
        // },
        // getNowDate() {
        //     let date = new Date();
        //     let day = date.getDay();
        //     let h = date.getHours();
        //     let m = date.getMinutes();
        //     return { day, h, m }
        // }
    }
}
</script>
