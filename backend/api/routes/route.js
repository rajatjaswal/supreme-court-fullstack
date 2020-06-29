import { getJusticeEntries, getJusticeDetails, getAllCases } from "../controllers/controller";

export const routes = (app, allCases, justiceEntries, allJustices, dateCases) =>{
    app.route("/justice/")
        .get((req, res )=> getJusticeEntries(req, res, justiceEntries))
    
    app.route("/justice/:justiceName")
        .get((req, res)=> getJusticeDetails(req, res, allJustices))

    app.route("/_check")
        .get((req, res) =>{
            res.status(200).send("Healthy");
        })

    app.route("/cases/")
        .get((req, res )=> getAllCases(req, res, dateCases))
}