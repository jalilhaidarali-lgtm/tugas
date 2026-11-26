// Data contoh penjualan. Angka ini hanya untuk demo tugas.
const laporan = {
  7: {
    pendapatan: 2450000,
    transaksi: 42,
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    tren: [240000, 310000, 280000, 390000, 350000, 510000, 370000],
    produk: [
      { nama: "Cappuccino", terjual: 38, harga: 20000 },
      { nama: "Americano", terjual: 31, harga: 18000 },
      { nama: "Berrycano", terjual: 24, harga: 23000 }
    ]
  },
  30: {
    pendapatan: 9850000,
    transaksi: 168,
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    tren: [2100000, 2450000, 2380000, 2920000],
    produk: [
      { nama: "Cappuccino", terjual: 142, harga: 20000 },
      { nama: "Americano", terjual: 119, harga: 18000 },
      { nama: "Berrycano", terjual: 86, harga: 23000 }
    ]
  },
  90: {
    pendapatan: 28600000,
    transaksi: 496,
    labels: ["Bulan 1", "Bulan 2", "Bulan 3"],
    tren: [8300000, 9600000, 10700000],
    produk: [
      { nama: "Cappuccino", terjual: 418, harga: 20000 },
      { nama: "Americano", terjual: 352, harga: 18000 },
      { nama: "Berrycano", terjual: 267, harga: 23000 }
    ]
  }
};

const pilihanPeriode = document.getElementById("period");

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

function tampilkanLaporan() {
  const data = laporan[pilihanPeriode.value];
  document.getElementById("revenue").textContent = formatRupiah(data.pendapatan);
  document.getElementById("transactions").textContent = data.transaksi;
  document.getElementById("favorite").textContent = data.produk[0].nama;

  const productRows = document.getElementById("productRows");
  productRows.replaceChildren();
  data.produk.forEach(function (produk) {
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + produk.nama + "</td><td>" + produk.terjual + " item</td><td>" + formatRupiah(produk.harga) + "</td>";
    productRows.appendChild(row);
  });

  const salesChart = document.getElementById("salesChart");
  salesChart.replaceChildren();
  const nilaiTertinggi = Math.max(...data.tren);

  data.tren.forEach(function (nilai, index) {
    const item = document.createElement("div");
    item.className = "chart-item";

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = (nilai / nilaiTertinggi * 85) + "%";
    bar.title = formatRupiah(nilai);

    const label = document.createElement("span");
    label.textContent = data.labels[index];

    item.append(bar, label);
    salesChart.appendChild(item);
  });
}

pilihanPeriode.addEventListener("change", tampilkanLaporan);
tampilkanLaporan();
