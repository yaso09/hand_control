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

## 👤 Geliştirici

**Yasir** tarafından geliştirilmiştir.

