# react-fetch-lite

[![npm version](https://img.shields.io/npm/v/react-fetch-lite.svg)](https://www.npmjs.com/package/react-fetch-lite)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-fetch-lite.svg)](https://bundlephobia.com/result?p=react-fetch-lite)
[![npm downloads](https://img.shields.io/npm/dm/react-fetch-lite.svg)](https://www.npmjs.com/package/react-fetch-lite)
[![license](https://img.shields.io/npm/l/react-fetch-lite.svg)](https://github.com/ferhatcklt/react-fetch-lite/blob/main/LICENSE)

A lightweight and easy-to-use React hook for fetching data. Handles loading, error, and request cancellation, while giving you full access to the native Fetch API options.

## 🔍 Why react-fetch-lite?

Managing `loading`, `error`, and `data` states in React is repetitive. This hook simplifies it by abstracting the logic into one clean, reusable hook — without sacrificing flexibility.

## 🧱 Traditional Approach (Verbose)

```jsx
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.example.com/data', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);
}
```

## ✅ Same Logic with react-fetch-lite

```jsx
import useFetch from 'react-fetch-lite';

function MyComponent() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## ⚙️ Features

- ✅ Clean and minimal API
- ⚡ No dependencies
- 🧠 Auto-cancels requests on unmount
- 🧩 Full support for all fetch options (POST, headers, etc.)
- 🧾 TypeScript ready
- 🪶 Tiny bundle size

## 📦 Installation

```bash
npm install react-fetch-lite
```

or

```bash
yarn add react-fetch-lite
```

## 🔧 Advanced Usage Example

```jsx
import useFetch from 'react-fetch-lite';

function CreatePost() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_token_here'
    },
    body: JSON.stringify({
      title: 'New Post',
      body: 'Post content here'
    })
  };

  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts', options);

  if (loading) return <p>Sending...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Success!</h2>
      <p>Post ID: {data?.id}</p>
    </div>
  );
}
```

## 📘 API

### `useFetch(url: string, options?: RequestInit)`

| Param | Type | Description |
|--|--|--|
|  `url` | `string` | Required. The endpoint to fetch. |
|  `options` | `RequestInit?` | Optional. All native fetch config options. |

#### Returns

```ts
{
  data: any;
  loading: boolean;
  error: Error | null;
}
```

## 🤝 Contributing

Pull requests and issues are welcome!

## 📄 License

MIT
