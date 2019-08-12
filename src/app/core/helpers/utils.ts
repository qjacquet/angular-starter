export class DateUtils {

    /**
     * Get date back 18 years
     */
    public static getDateBack18Years() {
        const today = new Date();
        return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    }

    /**
     * Return true if input date is later than date back 18 years
     *
     * @param date is date to check
     */
    public static isDateOverBack18Years(date: Date) {
        return date > this.getDateBack18Years();
    }
}


