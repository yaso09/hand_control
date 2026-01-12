Add-Type -AssemblyName System.Windows.Forms

Add-Type @"
using System;
using System.Runtime.InteropServices;

public class Mouse {
  [DllImport("user32.dll")]
  public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);

  public const int MOVE = 0x0001;
  public const int LEFTDOWN = 0x0002;
  public const int LEFTUP = 0x0004;
  public const int RIGHTDOWN = 0x0008;
  public const int RIGHTUP = 0x0010;
  public const int WHEEL = 0x0800;
}
"@

# Main loop to read commands from stdin
while ($true) {
    try {
        $line = [Console]::In.ReadLine()
        if ($line -eq $null) { break }
        
        $parts = $line -split ","
        $action = $parts[0]

        switch ($action) {
            "move" {
                if ($parts.Length -ge 3) {
                    $x = [int]$parts[1]
                    $y = [int]$parts[2]
                    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
                }
            }

            "click" {
                [Mouse]::mouse_event([Mouse]::LEFTDOWN, 0, 0, 0, 0)
                # Reduced sleep for better responsiveness, or removed if logic allows
                # Start-Sleep -Milliseconds 10 
                [Mouse]::mouse_event([Mouse]::LEFTUP, 0, 0, 0, 0)
            }

            "right-click" {
                [Mouse]::mouse_event([Mouse]::RIGHTDOWN, 0, 0, 0, 0)
                # Start-Sleep -Milliseconds 10
                [Mouse]::mouse_event([Mouse]::RIGHTUP, 0, 0, 0, 0)
            }

            "scroll" {
                if ($parts.Length -ge 2) {
                    $delta = [int]$parts[1]
                    [Mouse]::mouse_event([Mouse]::WHEEL, 0, 0, $delta, 0)
                }
            }
        }
    }
    catch {
        # Ignore errors to keep the loop running
    }
}
