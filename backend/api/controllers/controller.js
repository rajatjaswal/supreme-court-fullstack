import { dateBasedCasesWithin, idBasedCases } from "../services/justice-service";

export const getJusticeEntries = (req, res, justiceEntries) => {
    return res.status(200).send(justiceEntries);
};

export const getJusticeDetails = (req, res, allJustices) => {
    const justiceName2 = req.params.justiceName;
    const justice = allJustices.filter(j => j.name_2 === justiceName2)

    if(justice!==undefined) {
        return res.status(200).send(justice);
    }else{
        return res.status(404);
    }
}

export const getAllCases = (req, res, dateCases) => {
    return res.status(200).send(dateCases);
}

export const getAllCasesLen = (req, res, len) => {
    return res.status(200).send({'length':len});
}

export const getDateBasedCases = (req, res, dateCases) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    if(startDate === undefined || endDate === undefined) {
        return res.status(500).send({"Error":"Invalid"})
    }
    const cases = dateBasedCasesWithin(dateCases, startDate, endDate);

    return res.status(200).send(cases);
}

export const getIdBasedCase = (req, res, allCases) => {
    const id = req.params.caseID;
    if(id == undefined ) {
        return res.status(500).send({"Error":"Invalid"})
    }

    const cases = idBasedCases(allCases, id);

    if(cases === null ) {
        return res.status(404).send(`No Case found ${id}`)
    }

    return res.status(200).send(cases);
}