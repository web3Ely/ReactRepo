import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);
  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🥳 Far Away</h1>;
}

function Form({ onAddItems }) {
  const [inputText, setInputText] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!inputText) return;

    const newItem = {
      description: inputText,
      quantity: quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    setInputText("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤩 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((obj) => (
          <Item
            item={obj}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItems(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );
  }
  const numItems = items.length;
  const numPact = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPact / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything to go 🛫"
          : `You have
        ${numItems} items on your list, and you already parcked ${numPact} (
        ${percentage}%)`}
      </em>
    </footer>
  );
}
