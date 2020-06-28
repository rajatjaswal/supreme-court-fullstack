
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