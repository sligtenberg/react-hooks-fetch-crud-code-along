import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(response => response.json())
    .then(items => setItems(items))
  }, [])

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={newItem => setItems([...items, newItem])}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {items.filter(item => selectedCategory === "All" ? true : item.category === selectedCategory).map(item => <Item
          key={item.id}
          item={item}
          onUpdateItem={updatedItem => setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))}
          onDeleteItem={deletedItem => setItems(items.filter(item => item.id !== deletedItem.id))}/>
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
