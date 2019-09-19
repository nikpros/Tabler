<template lang="pug">
    .container
        .row
            .col
                h4 {{ name }}
        .row
            .col
                template(
                    v-for="day in createScheduleOfWeek(item)"
                )
                    .row
                        .col
                            p {{ day.day }}
                        .col
                            p {{ day.time }}
        hr
</template>

<script>


export default {
    data () {
        return {
            dayOfIndex: ["Выходной","Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        }
    },
    props: {
        name: String,
        item: Array
    },
    computed: {
    },
    methods: {
        createScheduleOfWeek(week) {
            let result = [];
            let tempDay = {};
            for (let item = 0, count = 1; week && item < week.length; item++) {
                if (week[item].dayOfWeek == count) {
                    let day = this.dayOfIndex[count];
                    if (week[item].startAt == '00:00' && week[item].endAt == '23:59') {
                        tempDay = {
                            day,
                            time: 'круглосуточно'
                        }
                        result.push(tempDay);
                    } else {
                        tempDay = {
                            day,
                            time: `${week[item].startAt}-${week[item].endAt}`
                        }
                        result.push(tempDay)
                    }
                    count++
                } else {
                    tempDay = {
                        day: this.dayOfIndex[count],
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
                        day: this.dayOfIndex[result.length + item],
                        time: this.dayOfIndex[0]
                    })
                }
            }
            return result
        }
    }
}
</script>
