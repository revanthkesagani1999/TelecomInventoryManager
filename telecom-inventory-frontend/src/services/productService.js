const products = [
    { id: 1, name: 'Phone', category: 'Electronics', stockLevel: 50, reorderPoint: 20 },
  ];
  
  export const getProducts = () => [...products];
  
  export const addProduct = (product) => {
    product.id = products.length + 1;
    products.push(product);
  };
  
  export const editProduct = (id, updatedProduct) => {
    const index = products.findIndex((product) => product.id === id);
    products[index] = { id, ...updatedProduct };
  };
  
  export const deleteProduct = (id) => {
    const index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
  };
  