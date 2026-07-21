"""Export embedded DOCX images using UTF-8-safe paths.

The source document is discovered from the working directory so PowerShell's
console code page cannot corrupt its Chinese filename.
"""

from pathlib import Path
import re
from zipfile import ZipFile


root = Path.cwd()
source = next(root.glob("*.docx"))
output = root / "public" / "tutorial-images"
output.mkdir(parents=True, exist_ok=True)

with ZipFile(source) as archive:
    media = [
        entry
        for entry in archive.namelist()
        if entry.startswith("word/media/") and Path(entry).suffix
    ]
    media.sort(key=lambda entry: int(re.search(r"image(\d+)", entry).group(1)))
    for old_file in output.glob("step-*"):
        old_file.unlink()
    for index, entry in enumerate(media, start=1):
        suffix = Path(entry).suffix.lower() or ".png"
        destination = output / f"step-{index:02d}{suffix}"
        destination.write_bytes(archive.read(entry))
        print(destination.as_posix())

print(f"Exported {len(media)} images from {source.name}")
