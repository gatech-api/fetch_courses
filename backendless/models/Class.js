/**
 * @property {String} registrationNumber
 * @property {String} classTime
 * @property {String} classSchedule
 * @property {String} classLocation
 * @property {String} classDateRange
 * @property {String} instructorName
 * @property {String} instructorEmail
 */
class Class extends Backendless.ServerCode.PersistenceItem {

}

module.exports = Backendless.ServerCode.addType(Class);
