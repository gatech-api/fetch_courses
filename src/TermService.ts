import fetch from 'isomorphic-fetch';
import { TERMS_CATALOG_URI } from '../config.js'


class TermService {

    /*
     * Returns Promise of terms raw html.
     *
     * @since   1.0.0
     * @access  private
     * @return  {Promise<string>}   Promise of terms raw html.
     */
    async _getTermsPromise(): Promise<string> {
        let response: Response = await fetch(TERMS_CATALOG_URI);
        return response.text();
    }

    /*
     * Returns boolean representing whether input date string is valid.
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}    date    Date string formatted like YYYY-mm.
     * @return  {boolean}           Boolean representing validity of date.
     */
    _dateIsValid(date: string): boolean {
        let month: number = parseInt(date.slice(4));
        return 1 <= month && month <= 12;
    }

    /*
     * Returns number of days between two Dates, or MAX_VALUE if end date is before start date.
     *
     * @since   1.0.0
     * @access  private
     * @param   {Date}      start   Start Date object.
     * @param   {Date}      end     End Date object.
     * @return  {number}            Number of days between two Dates (in order).
     */
    _daysBetween(start: Date, end: Date): number {
        if(end.getTime() < start.getTime()) {
            return Number.MAX_VALUE;
        }
        else {
            return Math.round((end.getTime() - start.getTime())/1000 * 60 * 60 * 24);
        }
    }

    /*
     * Returns latest term based on current date.<br>
     *
     * For all term dates that start <strong>after</strong> the current date, find the nearest one.
     *
     * @since   1.0.0
     * @access  private
     * @param   {Array<string>} allTerms    All terms returned from api.
     * @return  {string}                    Latest term.
     */
    _filterToCurrentTerm(allTerms: Array<string>): string {
        let currentDate: Date = new Date();
        let closestDateIndex: number = 0;
        let closestDateDiff: number = Number.MAX_VALUE;
        for(let i = 0; i < allTerms.length; i++) {
            if(this._dateIsValid(allTerms[i])) {
                let daysUntilTerm: number = this._daysBetween(currentDate, new Date(parseInt(allTerms[i].slice(0, 4)), parseInt(allTerms[i].slice(4)), 1));
                if(daysUntilTerm < closestDateDiff) {
                    closestDateIndex = i;
                    closestDateDiff = daysUntilTerm;
                }
            }
        }
        if(closestDateDiff == Number.MAX_VALUE) {
            throw new Error("No valid terms returned from api");
        }
        else {
            return allTerms[closestDateIndex];
        }
    }

    /*
     * Returns Promise representing the current term.
     *
     * @since   1.0.0
     * @access  public
     * @return  {Promise<string>}   Promise of current term string.
     */
    async getCurrentTerm(): Promise<string> {
        let termsRawHtml: string = await this._getTermsPromise();

        let matches: Array<RegExpMatchArray> = Array.from(termsRawHtml.matchAll(/<OPTION VALUE="(\d+)">/g));

        let allTerms: Array<string> = matches.flatMap(regexpmatch => regexpmatch[1]);

        if(allTerms.length == 0) {
            throw new Error("No terms returned from api");
        }
        else {
            return this._filterToCurrentTerm(allTerms);
        }
    }
}

export default TermService;
