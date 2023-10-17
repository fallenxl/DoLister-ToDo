import moment from 'moment';
export const getDays = (date: Date) => {
    return moment(date).startOf('hour').fromNow();
};  