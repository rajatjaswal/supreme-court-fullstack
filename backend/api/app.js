import { routes } from './routes/route.js';
import {getDataFromCSV, getAllJusticeData, getJusticeBasedCases, dateBasedCases} from './services/justice-service';
export const initializeApp = async (app) => {
    const allCases = getDataFromCSV();
    const allJustices = await getAllJusticeData().then(x => x).catch(e => e);
    const justiceEntries = getJusticeBasedCases(allCases, allJustices);
    const dateCases = dateBasedCases(allCases);
    routes(app, allCases, justiceEntries, allJustices, dateCases);
};