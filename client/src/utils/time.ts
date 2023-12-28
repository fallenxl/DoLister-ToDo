import moment from 'moment';
export const getDays = (date: Date) => {
    moment.locale('es');
    const formatDate = moment(date)
    return formatDate.fromNow();
};

export const getTimeOfTheDay = (name: string) => {
    const currentHour = moment().hour();
    if (currentHour >= 0 && currentHour < 12) return `Good morning ⛅, ${name}`
    if (currentHour >= 12 && currentHour < 18) return `Good afternoon 🌞, ${name}`

    return `Good evening 🌙, ${name}`
}