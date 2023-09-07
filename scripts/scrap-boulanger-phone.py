import requests
from bs4 import BeautifulSoup
import json

print('Scraping Boulanger...')

# URL du site
url = 'https://www.boulanger.com/c/smartphone-telephone-portable'

# En-têtes (pour simuler un navigateur)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
}

# Requête GET
response = requests.get(url, headers=headers)

print('Requête envoyée...')
print(response.status_code)

# Si la requête est valide (code 200)
if response.status_code == 200:

    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Liste pour stocker les données des articles
    articles_data = []

    # Scraping de la liste de produits
    items = soup.findAll('li', class_='product-list__item')

    for item in items:
        title = item.find('h2', class_='product-list__product-label')
        price = item.find('p', class_='price__amount')
        
        # Ajoutez cette vérification pour éviter l'erreur
        link_elem = item.find('a')
        if link_elem:
            link = link_elem['href']
        else:
            # Afficher un message ou poursuivre le traitement
            print("Lien non trouvé pour l'article, passage à l'article suivant")
            continue

        if title and price:
            cleaned_title = ' '.join(title.stripped_strings)
            cleaned_price = price.text.strip()

            # Convertir l'URL relative en URL absolue
            product_link = f'https://www.boulanger.com{link}'

            # Accéder à la page de détails du produit
            product_page = requests.get(product_link, headers=headers)
            product_soup = BeautifulSoup(product_page.content, 'html.parser')
            # print('Accès à la page du produit:', product_link)
            # Scraping des détails du produit
            product_details = {}

            product_feature_items = product_soup.find_all('li', class_='product-features__item')
            
            eco_part = product_soup.find('p', class_='price__tax')
            print(eco_part)
            
            for feature_item in product_feature_items:
                feature_name_element = feature_item.find('h3', class_='product-features__item-title')
                feature_value_element = feature_item.find('div', class_='product-features__item-content')

                if feature_name_element and feature_value_element:
                    feature_name = feature_name_element.text.strip()
                    feature_value = feature_value_element.text.strip()
                    product_details[feature_name] = feature_value

            # Traitement des boutons "Lire plus" si nécessaire
            read_more_button = product_soup.find('button', class_='bl-button read-more__btn')
            if read_more_button:
                read_more_url = read_more_button['data-target']
                read_more_response = requests.get(read_more_url, headers=headers)
                read_more_soup = BeautifulSoup(read_more_response.content, 'html.parser')

            # Traitement des boutons "Lire plus" si nécessaire
            read_more_button = product_soup.find('button', class_='bl-button read-more__btn')
            if read_more_button:
                read_more_url = read_more_button['data-target']
                read_more_response = requests.get(read_more_url, headers=headers)
                read_more_soup = BeautifulSoup(read_more_response.content, 'html.parser')

                # Continuer le scraping avec read_more_soup
                read_more_feature_items = read_more_soup.find_all('li', class_='product-features__item')
                for read_more_feature_item in read_more_feature_items:
                    read_more_feature_name_element = read_more_feature_item.find('h3', class_='product-features__item-title')
                    read_more_feature_value_element = read_more_feature_item.find('div', class_='product-features__item-content')

                    if read_more_feature_name_element and read_more_feature_value_element:
                        read_more_feature_name = read_more_feature_name_element.text.strip()
                        read_more_feature_value = read_more_feature_value_element.text.strip()
                        product_details[read_more_feature_name] = read_more_feature_value
                    print('Détails du produit:', product_details)

            # Ajoutez les détails du produit au dictionnaire article_info
            article_info = {
                'title': cleaned_title,
                'price': cleaned_price,
                'product_details': product_details
            }

            # Ajoutez les informations finales à la liste articles_data
            articles_data.append(article_info)

            print('Article trouvé:', cleaned_title, cleaned_price)
        else:
            print('Article non trouvé')

    # Écrire les données dans le fichier JSON
    with open('smartphone_details.json', 'w', encoding='utf-8') as json_file:
        json.dump(articles_data, json_file, ensure_ascii=False, indent=4)

    print('Données enregistrées dans smartphone_details.json')
            
else:
    print('La requête a échoué avec le code:', response.status_code)
