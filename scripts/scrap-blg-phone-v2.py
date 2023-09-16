from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Initialisation du navigateur
driver = webdriver.Chrome(executable_path="./chromedriver")  

# Ouvrir l'URL de base
base_url = 'https://www.boulanger.com/c/smartphone-telephone-portable'
driver.get(base_url)

# Attendre que la page se charge complètement
driver.implicitly_wait(10)

# Trouver tous les éléments contenant les titres des articles
items = driver.find_elements(By.CLASS_NAME, 'product-list__item')

data = []

for item in items:
    title_element = item.find_element(By.CLASS_NAME, 'product-list__product-label')
    price_element = item.find_element(By.CLASS_NAME, 'price__amount')

    # Clic sur l'élément de titre pour accéder à la page détail
    title_element.click()

    # Attendre que la page détail se charge complètement
    driver.implicitly_wait(10)

    # Extraire les informations de détail
    details = {}
    features = driver.find_elements(By.CLASS_NAME, 'product-features__item-content')
    for feature in features:
        if "Indice de réparabilité :" in feature.text:
            details['Indice de réparabilité'] = feature.text
        elif "Fabriqué en :" in feature.text:
            details['Fabriqué en'] = feature.text
        # Ajoutez d'autres conditions similaires pour les autres informations que vous voulez extraire
        
    # Aller à la racine de la page produit pour d'autres informations
    driver.execute_script("window.scrollTo(0, 0);")

    # Extraire la classe "price__tax"
    price_tax_element = driver.find_element(By.CLASS_NAME, 'price__tax')
    details['Price Tax'] = price_tax_element.text

    data.append({
        'Title': title_element.text,
        'Price': price_element.text,
        'Details': details
    })

    # Revenir à la page précédente
    driver.back()

# Fermer le navigateur
driver.quit()

# Écrire les données dans un fichier JSON
with open('smartphone_details.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print('Données enregistrées dans smartphone_details.json')
