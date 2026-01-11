# 🎮 Hand Control

> El hareketleriyle fare kontrolü yapan modern Electron uygulaması.

[![Platform](https://img.shields.io/badge/Platform-Windows-blue?style=flat-square)](https://www.microsoft.com/windows/)
[![Node](https://img.shields.io/badge/Node.js-Required-green?style=flat-square)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-Powered-9cf?style=flat-square)](https://www.electronjs.org/)

---

## ✨ Özellikler

- 🖱️ **El Hareketleriyle Kontrol** — Kameranız aracılığıyla fare hareketini yönetin
- ⚡ **Hızlı Performans** — Electron tabanlı optimal kullanıcı deneyimi
- 📦 **Paketlenmiş Dağıtım** — Windows installer desteği
- 🔧 **Kolay Kurulum** — Basit komutlarla hemen başlayın

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** ve **npm**
- **Windows** işletim sistemi

### Kurulum ve Çalıştırma

```powershell
# Bağımlılıkları yükle
npm install

# Geliştirme modunda çalıştır
npm start
```

---

## 📦 Derleme & Paketleme

Uygulamayı Windows için paketlemek için:

```powershell
npm run build
```

### NSIS Installer Oluşturma

Installer (.exe) oluşturmak için sisteminizde **NSIS** yüklü olmalıdır:

🔗 **İndir:** [NSIS Resmi Sayfası](https://nsis.sourceforge.io/Download)

---

## 📁 Proje Yapısı

| Dosya | Açıklama |
|-------|----------|
| `main.js` | Ana Electron süreci |
| `preload.js` | Ön yükleme betiği |
| `overlay.html` | Kullanıcı arayüzü |
| `mouse.ps1` | PowerShell mouse kontrol scripti |
| `package.json` | Proje bağımlılıkları ve konfigürasyonu |

---

## 🔧 Sorun Giderme

### "File is being used by another process" Hatası

Derleme sırasında bu hatayı alırsanız:

1. Çalışan `electron` veya `node` işlemlerini kapatın
2. `dist` klasörünü silin
3. `npm run build` komutunu tekrar çalıştırın

### Electron Sürümü Problemi

Electron sürümünü açıkça belirtmek için:

```powershell
npm install --save-dev electron@28.3.3
```

---

## 📖 Kullanım Kılavuzu

### Başlama

1. Uygulamayı başlattıktan sonra, **sistem trayinde** (ekranın sağ alt köşesi) bir ikon göreceksiniz
2. Tray ikonuna tıklayarak uygulamayı göster/gizleyebilirsiniz
3. Kameranız açılacak ve el hareketlerinizi algılamaya başlayacaktır

### El Hareketleri

#### **Sağ El — Fare Hareketi**
- **Başlama:** Sağ elinizin baş parmağıyla diğer parmakları tutun (clutch/kavrayış yapın)
- **Hareket:** Kavrayışı bırakın ve elinizi hareket ettirin — fare imleci takip edecektir
- **Çıkma:** Tekrar clutch yaparak ilk noktayı sıfırla

#### **Sol El — Tıklama ve Kaydırma**

**Tıklama (Sol Tıkla):**
- Başparmağınızı orta parmağınızla hızlı bir şekilde **kıstırın** (pinch) ve çabucak bırakın
- Fare sol tıklaması gönderilecektir

**Sağ Tıklama:**
- Başparmağınızı orta parmağınızla **uzun süre kıstırın** (550ms civarı)
- Sonra bırakın — sağ tıklama gerçekleşecektir

**Kaydırma (Scroll):**
- Sol elinizi **yumruk yapın** (tüm parmaklarınızı kapatın)
- Elinizi **yukarı/aşağı hareket ettirin** — sayfa kaydırılacaktır

### Ayarlar & Kontrol

| Parametre | Açıklama | Varsayılan Değer |
|-----------|----------|------------------|
| `SMOOTHING` | İmlecin hareketinin pürüzsüzlüğü | 0.15 |
| `GAIN` | Fare hareketinin duyarlılığı (yüksek = daha hızlı) | 2.8 |
| `RIGHT_CLICK_THRESHOLD` | Sağ tıklama için kıstırma süresi (ms) | 550 |
| `SCROLL_GAIN` | Kaydırma hızı | 0.6 |
| `SCROLL_DEADZONE` | Kaydırma için minimum parmak hareketi | 10 |

Bu değerleri **overlay.html** dosyasındaki `PARAMS` bölümünde değiştirebilirsiniz.

### Tray Menüsü Seçenekleri

- **Göster** — Overlay penceresi görünür hale getirir
- **Gizle** — Overlay penceresi gizler (ama uygulama çalışmaya devam eder)
- **Çık** — Uygulamayı kapatır

---

## 👤 Geliştirici

**Yasir** tarafından geliştirilmiştir.

