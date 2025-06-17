import tkinter as tk
from tkinter import ttk
import winsound

class CheatScanner:
    def __init__(self, root):
        self.root = root
        root.title("Cheat Scanner")
        self.label = tk.Label(root, text="Scanning for cheats...")
        self.label.pack(padx=20, pady=10)
        self.progress = ttk.Progressbar(root, length=300, maximum=30)
        self.progress.pack(padx=20, pady=10)
        self.update_progress(0)

    def update_progress(self, step):
        if step <= 30:
            self.progress['value'] = step
            self.root.after(1000, self.update_progress, step + 1)
        else:
            self.detected()

    def detected(self):
        self.label.config(text="Cheats detected on your system!", fg="red", font=("TkDefaultFont", 12, "bold"))
        try:
            winsound.PlaySound('siren.wav', winsound.SND_FILENAME | winsound.SND_ASYNC)
        except Exception:
            pass
        self.root.protocol("WM_DELETE_WINDOW", self.disable_close)
        self.root.after(5000, self.enable_close)

    def disable_close(self):
        pass

    def enable_close(self):
        self.root.protocol("WM_DELETE_WINDOW", self.root.destroy)


def main():
    root = tk.Tk()
    app = CheatScanner(root)
    root.mainloop()

if __name__ == "__main__":
    main()
