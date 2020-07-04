import * as d3 from 'd3';
import fs from 'fs';
import _ from 'lodash';
import axios from 'axios';


const process = name => {
    const raw = fs.readFileSync(`${__dirname}/static/${name}`, 'utf8')
    const csv = d3.csvParse(raw)
    return csv
}

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
    .filter(filterEntriesWithNoDate)
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

const filterEntriesWithNoDate = (c) => {
    const startDate = c.dateArgument === "" ? c.dateRearg : c.dateArgument;
    return startDate !== "";
}

const filterWithinDate = (c, startDate, endDate) => {
    const start =  new Date(c.startDate) >= startDate 
    const end = new Date(c.endDate) <= endDate;
    return start && end;
}

export const dateBasedCasesWithin = (allCases, startDate, endDate) => {
    const dateCases = allCases
    .filter(c => filterWithinDate(c, startDate, endDate));
    return dateCases;
}

export const getJusticeBasedCases = (entries, allJustices) => {
    const changed = d3.nest()
    .key(d => {
        return d.justiceName
    })
    .rollup(v => {
        const justice = allJustices.find(j => j.name_2 === v[0].justiceName);
        if(justice === undefined) {
            return{};
        }
        const difference = Math.abs(new Date(justice.finish_date) - new Date(justice.start_date)) / 1000;
        const duration = Math.floor(difference / (86400*365));
        return {
            cases: v.length,
            duration,
            justice_info: {
                name: justice.name,
                start_date: justice.start_date,
                finish_date: justice.finish_date,
                nominating_party: justice.nominating_party,
                military_service: justice.military_service,
                law_school: justice.law_school
            }
        }
    })
    .object(entries);
    return changed;
}

export const idBasedCases = (entries, id) => {
    const cases = entries.filter(c => c.caseId === id);
    if(cases.length==0) return null;
    const justices = cases.map(c => c.justiceName)
    const res = {};
    res['id'] = id;
    res['justices'] = justices;
    res['dateDecision'] = cases[0].dateDecision;
    res['dateArgument'] = cases[0].dateArgument;
    res['dateRearg'] = cases[0].dateRearg;
    
    return res;
}