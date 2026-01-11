**Proje**
- **Ad**: Hand Control
- **Açıklama**: El hareketleriyle fare kontrolü yapan Electron uygulaması.

**Hızlı Başlangıç**
- **Gereksinimler**: Node.js, `npm` ve Windows işletim sistemi.
- **Geliştirme modunda çalıştırma**:
```powershell
npm install
npm start
```

**Derleme / Paketleme**
- Proje `electron-builder` ile paketlenmiştir. Hedef: Windows (NSIS).
- Önceden bağımlılıkları yükleyin ve paketleyin:
```powershell
npm install
npm run build
```
- Eğer NSIS installer (.exe) oluşturmak istiyorsanız, sisteminizde `makensis` (NSIS) yüklü olmalıdır. Yüklemek için: https://nsis.sourceforge.io/Download

**Oluşan Sayfalar / Çıktı**
- Derleme sırasında unpacked uygulama veya installer oluşur.
- Örnek unpacked çıktı: `dist2/win-unpacked/Hand Control.exe` (veya `dist/win-unpacked` normal build kullanıldığında).
- Unpacked uygulamayı PowerShell'de çalıştırmak için:
```powershell
& "./dist2/win-unpacked/Hand Control.exe"
# veya
Start-Process "./dist2/win-unpacked/Hand Control.exe"
```

**Özel Dosyalar**
- Projeye eklenen ekstra dosya: `mouse.ps1` — paket içinde `resources` dizinine kopyalanır.

**Notlar ve Sorun Giderme**
- Eğer `npm run build` sırasında "file is being used by another process" hatası alırsanız:
  - Çalışan `electron` veya `node` süreçlerini kapatın.
  - `dist` klasörünü silip tekrar deneyin.
- electron sürümü belirtilmemişse `electron` paketini devDependency olarak ekleyin:
```powershell
npm install --save-dev electron@28.3.3
```

**İletişim**
- Yazarı: Yasir

