#!/bin/bash

echo "Début du script"

find . -type f -name "*.mp4" -print0 | while IFS= read -r -d $'\0' video; do
    # Affiche le nom du fichier en cours de traitement
    echo "Traitement de : $video"
   
    # Convertit la vidéo vers un fichier temporaire
    ffmpeg -nostdin -i "$video" -c:v libx264 -b:v 5000k -preset veryfast -c:a aac "${video}.tmp.mp4" && mv "${video}.tmp.mp4" "$video"
done

echo "Fin du script"
