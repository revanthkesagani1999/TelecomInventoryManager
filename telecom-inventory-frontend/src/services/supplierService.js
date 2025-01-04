const suppliers = [
    { id: 1, name: 'Supplier A', contactInfo: '123456789' },
  ];
  
  export const getSuppliers = () => [...suppliers];
  
  export const addSupplier = (supplier) => {
    supplier.id = suppliers.length + 1;
    suppliers.push(supplier);
  };
  
  export const editSupplier = (id, updatedSupplier) => {
    const index = suppliers.findIndex((supplier) => supplier.id === id);
    suppliers[index] = { id, ...updatedSupplier };
  };
  
  export const deleteSupplier = (id) => {
    const index = suppliers.findIndex((supplier) => supplier.id === id);
    suppliers.splice(index, 1);
  };
  