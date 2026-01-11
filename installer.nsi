; NSIS Installer Script for Hand Control
; El hareketleriyle fare kontrolü yapan Electron uygulaması

!include "MUI2.nsh"
!include "x64.nsh"

; Constants
!define APP_NAME "Hand Control"
!define APP_VERSION "1.0.0"
!define COMPANY_NAME "Yasir"
!define APP_IDENTIFIER "com.yasir.handcontrol"
!define INSTALLER_NAME "HandControl-Setup-${APP_VERSION}.exe"
!define INSTALL_DIR "$PROGRAMFILES64\${APP_NAME}"

; Installer Settings
Name "${APP_NAME} v${APP_VERSION}"
OutFile "${INSTALLER_NAME}"
InstallDir "${INSTALL_DIR}"
InstallDirRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "InstallLocation"

; Request admin privileges
RequestExecutionLevel admin

; MUI Settings
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

; Language
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Turkish"

; LangString for Turkish
LangString UninstallTitle ${LANG_TURKISH} "${APP_NAME} Kaldır"
LangString UninstallMessage ${LANG_TURKISH} "${APP_NAME} uygulamasını kaldırmak istediğinizden emin misiniz?"

; Installer Sections
Section "Install"
  SetOutPath "${INSTALL_DIR}"
  
  ; Copy application files from electron-builder output
  File /r "dist\win-unpacked\*"
  
  ; Create Start Menu shortcuts
  CreateDirectory "$SMPROGRAMS\${APP_NAME}"
  CreateShortCut "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" "${INSTALL_DIR}\Hand Control.exe"
  CreateShortCut "$SMPROGRAMS\${APP_NAME}\Uninstall.lnk" "$INSTDIR\uninstall.exe"
  
  ; Create Desktop shortcut
  CreateShortCut "$DESKTOP\${APP_NAME}.lnk" "${INSTALL_DIR}\Hand Control.exe"
  
  ; Write registry keys
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "DisplayName" "${APP_NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "DisplayVersion" "${APP_VERSION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "Publisher" "${COMPANY_NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "InstallLocation" "${INSTALL_DIR}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}" "UninstallString" "$INSTDIR\uninstall.exe"
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

; Uninstaller Section
Section "Uninstall"
  ; Remove application directory
  RMDir /r "${INSTALL_DIR}"
  
  ; Remove Start Menu shortcuts
  RMDir /r "$SMPROGRAMS\${APP_NAME}"
  
  ; Remove Desktop shortcut
  Delete "$DESKTOP\${APP_NAME}.lnk"
  
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_IDENTIFIER}"
SectionEnd

; Installer initialization
Function .onInit
  ${If} ${RunningX64}
    ; 64-bit Windows
  ${Else}
    MessageBox MB_OK "Bu uygulama 64-bit Windows gerektirir!"
    Quit
  ${EndIf}
FunctionEnd

; Uninstaller initialization
Function un.onInit
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "$(UninstallMessage)" IDYES +2
  Abort
FunctionEnd
