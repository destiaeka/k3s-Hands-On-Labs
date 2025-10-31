async function order(productId) {
  const qty = prompt("Masukkan jumlah:");
  if(!qty) return;
  const res = await fetch('http://be-service:8080/orders', {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({productId, quantity: qty})
  });
  const data = await res.json();
  alert(`Order berhasil! ID: ${data.id}, ${data.product.name} x${data.quantity}`);
}
