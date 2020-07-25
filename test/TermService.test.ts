import test from 'ava';
import sinon, {SinonStub} from 'sinon';
import TermService from "../src/service/TermService.js";


let termService: TermService;
let getTermsPromiseStub: SinonStub;
sinon.useFakeTimers(new Date(2020, 8, 1));

const VALID_TERM: string = "202008";
const INVALID_TERM: string = "999999";
const PAST_TERM: string = "199901";

test.beforeEach(() => {
    termService = new TermService();
    getTermsPromiseStub = sinon.stub(termService, <any>"_getTermsPromise");
})

test('TermService should apply regex correctly for valid term', async t => {
    //Given
    getTermsPromiseStub.resolves(`<OPTION VALUE="${VALID_TERM}">`);

    //When
    let actual: string = await termService.getCurrentTerm();

    //Then
    t.is(actual, VALID_TERM);
})

test('TermService should throw error for invalid term', async t => {
    //Given
    getTermsPromiseStub.resolves(`<OPTION VALUE="${INVALID_TERM}">`);

    //When
    let error = await t.throwsAsync(async () => {
        await termService.getCurrentTerm();
    });

    //Then
    t.is(error.message, "No valid terms returned from api");
})

test('TermService should throw error for empty api response', async t => {
    //Given
    getTermsPromiseStub.resolves(``);

    //When
    let error = await t.throwsAsync(async () => {
        await termService.getCurrentTerm();
    });

    //Then
    t.is(error.message, "No terms returned from api");
})

test('TermService should deprioritize enrollment terms in the past', async t => {
    //Given
    getTermsPromiseStub.resolves(`<OPTION VALUE="${PAST_TERM}">\n<OPTION VALUE="${VALID_TERM}">`);

    //When
    let actual: string = await termService.getCurrentTerm();

    //Then
    t.is(actual, VALID_TERM);
})
