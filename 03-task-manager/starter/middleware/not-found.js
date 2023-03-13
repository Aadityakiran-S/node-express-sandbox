const notFound = (req, res) => {
    console.log('Hello');
    return res.status(404).send(`Route does not exist`);
}

module.exports = notFound;