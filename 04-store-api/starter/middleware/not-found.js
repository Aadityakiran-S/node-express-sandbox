const notFound = (req, res) => { return res.status(404).send('<h2> Route does not exist!'); }

module.exports = notFound;