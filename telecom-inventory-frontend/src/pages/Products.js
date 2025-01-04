import React, { useState, useEffect } from 'react';
import '../styles/components/Products.css';
import { getProducts, addProduct, editProduct, deleteProduct } from '../services/productService';
import * as XLSX from 'xlsx';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', stockLevel: '', reorderPoint: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = getProducts();
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const handleAddOrEdit = () => {
    if (editingProduct) {
      editProduct(editingProduct.id, form);
    } else {
      addProduct(form);
    }
    setProducts(getProducts());
    setForm({ name: '', category: '', stockLevel: '', reorderPoint: '' });
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
  };



const handleImport = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const importedData = XLSX.utils.sheet_to_json(sheet);
    importedData.forEach((product) => addProduct(product));
    setProducts(getProducts());
  };
  reader.readAsArrayBuffer(file);
};

const handleExport = () => {
  const ws = XLSX.utils.json_to_sheet(products);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products');
  XLSX.writeFile(wb, 'products.xlsx');
};

  return (
    <div className="products">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <form
        className="product-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrEdit();
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock Level"
          value={form.stockLevel}
          onChange={(e) => setForm({ ...form, stockLevel: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Reorder Point"
          value={form.reorderPoint}
          onChange={(e) => setForm({ ...form, reorderPoint: e.target.value })}
          required
        />
        <button type="submit">{editingProduct ? "Edit" : "Add"} Product</button>
      </form>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-item" key={product.id}>
            <span>{product.name}</span>
            <span>{product.category}</span>
            <span>{product.stockLevel}</span>
            <span>{product.reorderPoint}</span>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="import-export">
        <input type="file" onChange={handleImport} accept=".xlsx, .xls, .csv" />
        <button onClick={handleExport}>Export Products</button>
      </div>
    </div>
  );
};

export default Products;
