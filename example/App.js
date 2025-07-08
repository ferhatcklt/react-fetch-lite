import React from 'react';
// Güncellenmiş hook'umuzu import ediyoruz.
import useFetch from '../src/useFetch.js';

// --- Örnek 1: Basit GET İsteği (Eski Kullanım) ---
// Bu bileşen, hook'un hala sadece bir URL ile sorunsuz çalıştığını gösterir.
const PublicPost = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');

  if (loading) return <p>Public Post Yükleniyor...</p>;
  if (error) return <p>Public Post Hata: {error.message}</p>;

  return (
    <article>
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </article>
  );
};


// --- Örnek 2: Kimlik Doğrulamalı POST İsteği (Yeni Güçlü Kullanım) ---
// Bu bileşen, hook'a options parametresi göndererek nasıl POST isteği
// atılacağını ve Authorization başlığı ekleneceğini gösterir.
const SimulatedAuthenticatedRequest = () => {
  // Gerçek bir uygulamada bu token, kullanıcının state'inden veya context'inden gelir.
  const fakeAuthToken = '123-ABC-XYZ-789';

  // Göndermek istediğimiz veri
  const postData = {
    title: 'Merhaba Dünya',
    body: 'Bu bir test gönderisidir.',
    userId: 1,
  };

  // useFetch'e göndereceğimiz options nesnesi
  const fetchOptions = {
    method: 'POST', // İstek metodunu belirtiyoruz.
    headers: {
      'Content-Type': 'application/json',
      // Token'ımızı Authorization başlığına ekliyoruz.
      'Authorization': `Bearer ${fakeAuthToken}`,
    },
    // Göndereceğimiz veriyi JSON string'ine çeviriyoruz.
    body: JSON.stringify(postData),
  };

  // Hook'u hem URL hem de options ile çağırıyoruz.
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts', fetchOptions);

  if (loading) return <p>Kimlik Doğrulamalı İstek Yükleniyor...</p>;
  if (error) return <p>Kimlik Doğrulamalı İstek Hata: {error.message}</p>;

  return (
    <div>
      <h3>Sunucudan Gelen Cevap (POST isteği sonrası):</h3>
      {/* Sunucu genellikle oluşturduğu yeni kaynağı geri döner */}
      <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
    </div>
  );
};


// --- Ana Uygulama Bileşeni ---
// İki örneği de ekranda gösterir.
const App = () => {
  return (
    <div>
      <h1>react-fetch-lite Test Alanı</h1>
      
      <hr />
      <h2>Örnek 1: Herkese Açık Basit GET İsteği</h2>
      <PublicPost />
      
      <hr />
      <h2>Örnek 2: Kimlik Doğrulamalı POST İsteği Simülasyonu</h2>
      <SimulatedAuthenticatedRequest />
    </div>
  );
};

export default App;