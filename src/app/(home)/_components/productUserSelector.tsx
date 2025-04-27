"use client";

import { useState } from "react";
import { useGetProductsQuery } from "@/lib/api/productsApi";
import { useGetUsersQuery } from "@/lib/api/usersApi";
import { Product } from "@/ts/models/product";
import DataColumn from "./dataColumn";

const ProductUserSelector = () => {
  const { data: products = [], isLoading: productsLoading } =
    useGetProductsQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");
  const [selectedSearch, setSelectedSearch] = useState<string>("");

  const handleSelectProduct = (product: Product) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredSelected = selectedProducts.filter((p) =>
    p.title.toLowerCase().includes(selectedSearch.toLowerCase())
  );

  if (productsLoading || usersLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <DataColumn
        searchInput={{
          placeholder: "Search products...",
          onChange: (e) => setProductSearch(e.target.value),
        }}
      >
        {filteredProducts.slice(0, 10).map((product) => (
          <li
            key={product.id}
            onClick={() => handleSelectProduct(product)}
            className="cursor-pointer p-1 hover:bg-gray-100"
          >
            {product.title}
          </li>
        ))}
      </DataColumn>
      <DataColumn
        searchInput={{
          placeholder: "Search users...",
          onChange: (e) => setUserSearch(e.target.value),
        }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer p-1 hover:bg-gray-100"
            onClick={() => (window.location.href = `/user/${user.id}`)}
          >
            {user.username}
          </li>
        ))}
      </DataColumn>
      <DataColumn
        searchInput={{
          placeholder: "Search selected...",
          onChange: (e) => setSelectedSearch(e.target.value),
        }}
      >
        {filteredSelected.map((product) => (
          <li
            key={product.id}
            onClick={() => handleRemoveProduct(product.id)}
            className="cursor-pointer p-1 hover:bg-gray-100 flex items-center"
          >
            <span className="text-green-600 mr-2">✔️</span> {product.title}
          </li>
        ))}
      </DataColumn>
    </main>
  );
};

export default ProductUserSelector;
