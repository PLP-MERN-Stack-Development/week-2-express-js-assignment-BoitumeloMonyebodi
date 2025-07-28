export const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Product name is required and must be a string' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Product description is required and must be a string' });
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ message: 'Price must be a valid positive number' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: 'Category is required and must be a string' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be a boolean (true or false)' });
  }

  // Optional: set price as a number in the request body
  req.body.price = parsedPrice;

  next();
};