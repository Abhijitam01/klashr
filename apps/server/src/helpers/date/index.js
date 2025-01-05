export var DateHelper;
(function (DateHelper) {
    function getNow() {
        return new Date();
    }
    DateHelper.getNow = getNow;
    function addMinutes(date, minutes) {
        const dateUpdated = new Date(date.getTime());
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;
        dateUpdated.setTime(dateUpdated.getTime() + milliseconds);
        return dateUpdated;
    }
    DateHelper.addMinutes = addMinutes;
    function isBefore(dateBefore, dateAfter) {
        return dateBefore < dateAfter;
    }
    DateHelper.isBefore = isBefore;
})(DateHelper || (DateHelper = {}));
