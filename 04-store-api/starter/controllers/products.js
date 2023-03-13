const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'prd testing route' });
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route' });
}

module.exports = { getAllProducts, getAllProductsStatic }