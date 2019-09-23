<template lang="pug">
    .container
        .row
            .col
                h4 {{ name }}
            .col
                p
                    font-awesome-icon(
                        icon="circle"
                    )
                    | {{ timeNow }}
        .row
            .col
                template(
                    v-for="day in mergeCoincidences(createScheduleOfWeek(item))"
                )
                    .row
                        .col
                            p {{ _console(day.day) }}
                        .col
                            p {{ day.time }}
        hr
</template>

<script>


export default {
    data () {
        return {
            dayOfIndex: ["Выходной","Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            timeNow: null
        }
    },
    props: {
        name: String,
        item: Array
    },
    computed: {
    },
    mounted() {
        let date = new Date();
        this.timeNow = `${date.getHours()}:${date.getMinutes()}, ${date.getDay()}`;
        console.log(typeof date.getHours())
    },
    methods: {
        createScheduleOfWeek(week) {
            let result = [];
            let tempDay = {};
            for (let item = 0, count = 1; week && item < week.length; item++) {
                if (week[item].dayOfWeek == count) {
                    // let day = this.dayOfIndex[count];
                    if (week[item].startAt == '00:00' && week[item].endAt == '23:59') {
                        tempDay = {
                            day: week[item].dayOfWeek,
                            time: 'круглосуточно'
                        }
                        result.push(tempDay);
                    } else {
                        tempDay = {
                            day: week[item].dayOfWeek,
                            time: `${week[item].startAt}-${week[item].endAt}`
                        }
                        result.push(tempDay)
                    }
                    count++
                } else {
                    tempDay = {
                        day: count,
                        time: this.dayOfIndex[0]
                    }
                    result.push(tempDay)
                    count++;
                    item--;
                }
            }
            if (result.length != 7) {
                for (let item = 1; 7 - result.length > 0;) {
                    result.push({
                        day: result.length + item,
                        time: this.dayOfIndex[0]
                    })
                }
            }
            return result
        },
        mergeCoincidences(week) {
            let result = [];
            for (let i = 0; week && week.length != 0;) {
                let pattern = week[i].time;
                let arr = [];
                for (let j = 0; j < week.length; j++) {
                    if (week[j].time == pattern) {
                        arr.push(week[j].day);
                        week.splice(j, 1);
                        j--;
                    }
                }
                result.push({
                    day: arr,
                    time: pattern
                })
            }
            return result
        },
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
        }
    }
}
</script>
