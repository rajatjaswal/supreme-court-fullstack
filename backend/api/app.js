import { routes } from './routes/route.js';
import {getDataFromCSV, getAllJusticeData, getJusticeBasedCases, dateBasedCases} from './services/justice-service';
export const initializeApp = async (app) => {
    const allCases = getDataFromCSV();
    const justiceEntries = getJusticeBasedCases(allCases);
    const dateCases = dateBasedCases(allCases);
    const allJustices = await getAllJusticeData().then(x => x).catch(e => e);
    routes(app, allCases, justiceEntries, allJustices, dateCases);
};