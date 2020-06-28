import * as d3 from 'd3';
import fs from 'fs';
import _ from 'lodash';
import axios from 'axios';


const process = name => {
    const raw = fs.readFileSync(`${__dirname}/static/${name}`, 'utf8')
    const csv = d3.csvParse(raw)
    return csv
}

// const processCSVByDate = name => {
//     const raw = fs.readFileSync(`${__dirname}/static/${name}`, 'utf8')
//     const csv = d3.csvParse(raw, (row) => {
//         return {
//             caseId: row.caseId,
//             startDate: row.dateArgument,
//             endDate: row.dateDecision
//         }
//     });
//     return csv;
// }

export const getAllJusticeData = async () => {
    const data = await axios.get('http://frontend-exercise-api.herokuapp.com/justices/')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return "Error";
    });
    return data;
}

export const getDataFromCSV = () => {
    var files = fs.readdirSync(`${__dirname}/static`)
    const entries = _.flatMap(files, filename => process(filename));
    return entries;
}

export const dateBasedCases = (entries) => {
    const nonUnique = entries
    .filter( (c) => {
        const startDate = c.dateArgument === "" ? c.dateRearg : c.dateArgument;
        return startDate !== "";
    })
    .map( (c) => {
        const caseId = {};
        caseId['id'] = c.caseId;
        caseId['startDate'] = c.dateArgument === "" ? c.dateRearg : c.dateArgument;
        caseId['endDate'] = c.dateDecision;
        return [c.caseId,caseId];
    });
    const res = [...new Map(nonUnique).values()];
    return res;
}

export const getJusticeBasedCases = (entries) => {
    const changed = d3.nest()
    .key(d => d.justiceName)
    .rollup(v => v.length)
    .entries(entries);
    return changed;
}