# mcirReveal
Un plugin pour faire de l'animation au scroll, easy biscuit.

# Utilisation
Un exemple concret est disponible dans le dossier how_to_use.

# Paramètres disponibles
REQUIRED trigger (selector) : L'élément qui déclenche l'animation

element (selector) : L'élément qui se verra animé

stagger (bool) : Si true, element est un sélecteur de plusieurs éléments, et un délai (stagger_delay) sera inséré entre le déclenchement de la fonction (animFn).

stagger_delay (int) : Si stagger est à true, le délai sera celui-ci, en ms.

offset (int) : Par défaut, la ligne de détection est tout en bas de l'élément $(window). Cette variable décale cette ligne de détection par le montant que vous entrez ici. Si j'y met 200, la ligne de détection sera à 200 pixels du bas de l'écran. Valeurs négatives possibles (au delà du bas de l'écran).

disable_breakpoint (int) : Un breakpoint à partir duquel tout cela est désactivé.

REQUIRED animFn (function) : La fonction qui défini de quelle manière l'élément sera montré. Du simple add/remove class jusqu'à TweenMax si nécessaire.