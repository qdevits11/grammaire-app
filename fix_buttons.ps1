$filePath = "c:\Users\Quentin Devits\OneDrive - Becoflex\Documents\GitHub\grammaire-app\index.html"
$content = [System.IO.File]::ReadAllText($filePath)

# Vérifier si le code de fin de boucle existe déjà
if ($content -match "\s+\}\)\;\s*\r?\n\s*\}") {
    Write-Host "Le code de fin de boucle existe déjà. Aucune modification nécessaire."
    exit 0
}

# Trouver la fin de la boucle forEach et insérer le code nécessaire
$pattern = [regex]::Escape("          fragment.appendChild(bouton);
          console.log('Bouton ajouté au fragment avec succès.');
          
        } catch (error) {
          console.error(`Erreur lors de la création du bouton ${index}:`, error);
        }
      });
    }")

$replacement = @"
          fragment.appendChild(bouton);
          console.log('Bouton ajouté au fragment avec succès.');
          
        } catch (error) {
          console.error(`Erreur lors de la création du bouton ${index}:`, error);
        }
      });
      
      // Ajouter tous les boutons au conteneur en une seule opération
      console.log('Ajout des boutons au conteneur...');
      reponsesContainer.appendChild(fragment);
      console.log('Boutons ajoutés avec succès au conteneur. Nombre de boutons:', reponsesContainer.children.length);
      
      // Vérifier si des boutons ont été ajoutés
      if (reponsesContainer.children.length === 0) {
        console.warn('Aucun bouton n\'a été ajouté au conteneur');
        const messageAucunBouton = document.getElementById('message-aucun-bouton');
        if (messageAucunBouton) {
          messageAucunBouton.style.display = 'block';
          messageAucunBouton.textContent = 'Impossible de générer les boutons de réponse';
        }
      } else {
        // Cacher le message si des boutons ont été ajoutés
        const messageAucunBouton = document.getElementById('message-aucun-bouton');
        if (messageAucunBouton) {
          messageAucunBouton.style.display = 'none';
        }
      }
    }"
"@

$newContent = $content -replace $pattern, $replacement

# Écrire le contenu modifié dans le fichier
[System.IO.File]::WriteAllText($filePath, $newContent)

Write-Host "Le fichier a été mis à jour avec succès."
