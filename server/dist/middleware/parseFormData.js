"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFormData = parseFormData;
function parseFormData(req, res, next) {
    if (req.body.features && typeof req.body.features === 'string') {
        try {
            req.body.features = JSON.parse(req.body.features);
        }
        catch (_a) {
            req.body.features = [];
        }
    }
    if (req.body.coordinates && typeof req.body.coordinates === 'string') {
        try {
            req.body.coordinates = JSON.parse(req.body.coordinates);
        }
        catch (_b) {
            req.body.coordinates = undefined;
        }
    }
    next();
}
