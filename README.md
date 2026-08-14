# I Ching · 易經 — Değişimler Kitabı

Geleneksel üç sikke yöntemiyle hekzagram falı bakan bir React uygulaması. King
Wen sıralamasına göre 64 hekzagramın tümünü, geleneksel Hüküm / İmge / Anlam
metinlerini ve değişen çizgilerden doğan dönüşüm hekzagramını içerir.

## Özellikler

- Geleneksel üç sikke yöntemiyle animasyonlu hekzagram çekimi
- 64 hekzagramın tam metni (Çince karakter, pinyin, Türkçe çeviri, hüküm,
  imge ve anlam yorumu)
- Alt/üst trigram (bagua) gösterimi
- Değişen çizgilerden otomatik ikinci (dönüşen) hekzagram hesaplama
- Soru girme alanı ve sonucu panoya kopyalama
- Tarayıcıda saklanan çekiliş geçmişi

## Geliştirme

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi (dist/)
npm run preview  # üretim derlemesini önizleme
```

## Yapı

```
src/
  data/hexagrams.js     64 hekzagramın verisi
  utils/iching.js        sikke atma, hekzagram/trigram hesaplama mantığı
  components/            UI bileşenleri (kart, çizgi, sikke, detay)
  App.jsx                ana uygulama
```
