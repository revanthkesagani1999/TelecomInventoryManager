import React, { useState, useEffect } from 'react';
import '../styles/components/Suppliers.css';
import { getSuppliers, addSupplier, editSupplier, deleteSupplier } from '../services/supplierService';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', contactInfo: '' });
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    setSuppliers(getSuppliers());
  }, []);

  const handleAddOrEdit = () => {
    if (editingSupplier) {
      editSupplier(editingSupplier.id, form);
    } else {
      addSupplier(form);
    }
    setSuppliers(getSuppliers());
    setForm({ name: '', contactInfo: '' });
    setEditingSupplier(null);
  };

  const handleDelete = (id) => {
    deleteSupplier(id);
    setSuppliers(getSuppliers());
  };

  return (
    <div className="suppliers">
      <h1>Suppliers</h1>
      <form
        className="supplier-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrEdit();
        }}
      >
        <input
          type="text"
          placeholder="Supplier Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
          required
        />
        <button type="submit">{editingSupplier ? 'Edit' : 'Add'} Supplier</button>
      </form>
      <div className="supplier-list">
        {suppliers.map((supplier) => (
          <div className="supplier-item" key={supplier.id}>
            <span>{supplier.name}</span>
            <span>{supplier.contactInfo}</span>
            <button onClick={() => setEditingSupplier(supplier)}>Edit</button>
            <button onClick={() => handleDelete(supplier.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
