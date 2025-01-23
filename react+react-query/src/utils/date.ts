import { format } from "date-fns/format";

export const formatted_date = (date: string) => {
    try {
        return format(new Date(date).toString(), 'MMM dd, yyyy');
    }
    catch (a) {
        return date
    }
}
