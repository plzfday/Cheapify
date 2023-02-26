import requests
from bs4 import BeautifulSoup as bs
import re

from models import Product, Category


def retrieve_products_by_category(link):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

    running = True
    page_num = 1

    while running:
        url = f"{link}/?page={page_num}&count=48"
        page = requests.get(url, headers=headers)
        soup = bs(page.content, 'html.parser')

        elements = soup.find_all('li', {'class': 'product-list--list-item'})
        title = soup.find("div", id="results").h1.text

        print(title)

        for element in elements:
            try:
                name = element.find("span", class_="ldbwMG").text
                price = element.find(
                    "p", class_="jWPEtj").text.replace("£", "")
                # price_per_unit = re.sub(
                #     r"£|\s?\/[\w]*", "", element.find("p", class_="icrlVF").text)
                seller = "Tesco"
                link = element.find("a", class_="csVOnh")["href"]
                image = re.sub(r'^(http[s]?:\/\/\S+).*$', r'\1', element.find(
                    "img", class_="bJErKA")["srcset"]).replace("?h=225&w=225", "")

                product = Product(
                    name=name, price=price, seller=seller, link=link, image=image)
                product.save()
                category = Category(name=title)
                category.save()
                category.products.add(product)
            except:
                pass

        # check the pagination
        pags = soup.find("nav", class_="pagination--page-selector-wrapper")
        last_pag = pags.find_all("li", class_="pagination-btn-holder")[-1]
        running = "disabled" not in last_pag.a["class"]
        page_num += 1


if __name__ == "__main__":
    retrieve_products_by_category(
        "https://www.tesco.com/groceries/en-GB/shop/fresh-food/all")
