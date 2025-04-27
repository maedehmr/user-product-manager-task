"use client";

import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/lib/api/productsApi";
import { useGetUsersQuery } from "@/lib/api/usersApi";
import { Product } from "@/ts/models/product";
import DataColumn from "./dataColumn";
import ListItems from "./listItems";
import { useRouter } from "next/navigation";

const ProductUserSelector = () => {
  const router = useRouter();
  const { data: products = [], isLoading: productsLoading } =
    useGetProductsQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searches, setSearches] = useState({
    product: "",
    user: "",
    selected: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSelectProduct = (product: Product) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filterItems = <T,>(
    items: T[],
    search: string,
    getField: (item: T) => string
  ) => {
    if (!items) return [];
    const lowerSearch = search.toLowerCase();
    return items.filter((item) =>
      getField(item).toLowerCase().includes(lowerSearch)
    );
  };

  const filteredProducts = filterItems(
    products,
    searches.product,
    (p) => p.title
  );
  const filteredUsers = filterItems(users, searches.user, (u) => u.username);
  const filteredSelected = filterItems(
    selectedProducts,
    searches.selected,
    (p) => p.title
  );

  useEffect(() => {
    if (!usersLoading && !productsLoading) setIsLoading(false);
  }, [usersLoading, productsLoading]);

  return isLoading ? (
    <div className="text-center p-4">Loading...</div>
  ) : (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <DataColumn
        searchInput={{
          placeholder: "Search products...",
          onChange: (e) =>
            setSearches((prev) => ({ ...prev, product: e.target.value })),
        }}
      >
        <ListItems
          items={filteredProducts || []}
          getKey={(p) => p.id}
          getLabel={(p) => p.title}
          onItemClick={handleSelectProduct}
        />
      </DataColumn>
      <DataColumn
        searchInput={{
          placeholder: "Search users...",
          onChange: (e) =>
            setSearches((prev) => ({ ...prev, user: e.target.value })),
        }}
      >
        <ListItems
          items={filteredUsers || []}
          getKey={(u) => u.id}
          getLabel={(u) => u.username}
          onItemClick={(user) => router.push(`/user/${user.id}`)}
        />
      </DataColumn>
      <DataColumn
        searchInput={{
          placeholder: "Search selected...",
          onChange: (e) =>
            setSearches((prev) => ({ ...prev, selected: e.target.value })),
        }}
      >
        <ListItems
          items={filteredSelected}
          getKey={(p) => p.id}
          getLabel={(p) => p.title}
          onItemClick={(product) => handleRemoveProduct(product.id)}
          icon={<span className="text-green-600">✔️</span>}
        />
      </DataColumn>
    </main>
  );
};

export default ProductUserSelector;
