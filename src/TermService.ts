import fetch from 'isomorphic-fetch';
import { TERMS_CATALOG_URI } from '../config.js'


class TermService {

    async _getTermsPromise(): Promise<string> {
        let response: Response = await fetch(TERMS_CATALOG_URI);
        return response.text();
    }

    _dateIsValid(date: string): boolean {
        let month: number = parseInt(date.slice(4));
        return 1 <= month && month <= 12;
    }

    _daysBetween(start: Date, end: Date): number {
        return Math.round((end.getTime() - start.getTime())/1000 * 60 * 60 * 24);
    }

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
